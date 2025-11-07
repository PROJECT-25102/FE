import { useQuery } from "@tanstack/react-query";
import { Button, Pagination, Table, type TableProps } from "antd";
import { QUERYKEY } from "../../../common/constants/queryKey";
import { useTableHook } from "../../../common/hooks/useTableHook";
import { getAllMovie } from "../../../common/services/movie.service";
import type { IMovie } from "../../../common/types/movie";
import { columnMovie } from "./components/Column";
import FilterMovie from "./components/FilterMovie";
import { Link } from "react-router";
import { FileAddOutlined } from "@ant-design/icons";

const ListMovie = () => {
  const { query, onFilter, getSorterProps, onSelectPaginateChange } =
    useTableHook<IMovie>();
  const { data, isPending } = useQuery({
    queryKey: [QUERYKEY.MOVIE, ...Object.values(query)],
    queryFn: () =>
      getAllMovie({
        pagination: true,
        searchFields: ["name"],
        limit: 5,
        ...query,
      }),
  });
  const onChangeTable: TableProps<IMovie>["onChange"] = (
    _,
    filters,
    sorter,
  ) => {
    onFilter(filters, sorter);
  };
  return (
    <div className="bg-[#121822] w-full min-h-[85dvh] rounded-md shadow-md px-6 py-4 relative">
      <h3 className="text-lg font-semibold">Danh sách phim</h3>
      <div className="flex justify-between items-center">
        <FilterMovie />
        <Link to={"/admin/movie/create"}>
          <Button
            style={{ height: 35 }}
            type="primary"
            icon={<FileAddOutlined />}
          >
            Thêm phim mới
          </Button>
        </Link>
      </div>
      <div className="mt-4">
        <Table<IMovie>
          columns={columnMovie(getSorterProps)}
          onChange={onChangeTable}
          dataSource={data?.data || []}
          loading={isPending}
          scroll={{
            x: "horizontal",
          }}
          bordered
          pagination={false}
        />
        {!isPending && data && (
          <Pagination
            current={data.meta?.page}
            total={data.meta?.total}
            pageSize={data.meta?.limit}
            onChange={onSelectPaginateChange}
            align="end"
            className="mt-6!"
          />
        )}
      </div>
    </div>
  );
};

export default ListMovie;
