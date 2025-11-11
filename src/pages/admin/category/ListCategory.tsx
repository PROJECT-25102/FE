import { FileAddOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Pagination, Table, type TableProps } from "antd";
import { Link } from "react-router";
import { QUERYKEY } from "../../../common/constants/queryKey";
import { useTableHook } from "../../../common/hooks/useTableHook";
import { getAllCategory } from "../../../common/services/category.service";
import type { ICategory } from "../../../common/types/category";
import { columnCategory } from "./components/Column";
import FilterCategory from "./components/FilterCategory";

const ListCategory = () => {
  const { query, onFilter, getSorterProps, onSelectPaginateChange } =
    useTableHook<ICategory>();
  const { data, isPending } = useQuery({
    queryKey: [QUERYKEY.CATEGORY, ...Object.values(query)],
    queryFn: () =>
      getAllCategory({
        pagination: true,
        searchFields: ["name"],
        limit: 5,
        ...query,
      }),
  });
  const onChangeTable: TableProps<ICategory>["onChange"] = (
    _,
    filters,
    sorter,
  ) => {
    onFilter(filters, sorter);
  };
  return (
    <div className="bg-[#121822] w-full min-h-[85dvh] rounded-md shadow-md px-6 py-4 relative">
      <h3 className="text-lg font-semibold">Danh sách thể loại</h3>
      <div className="flex justify-between items-center mt-4">
        <FilterCategory />
        <Link to={"/admin/category/create"}>
          <Button
            style={{ height: 35 }}
            type="primary"
            icon={<FileAddOutlined />}
          >
            Thêm thể loại mới
          </Button>
        </Link>
      </div>
      <div className="mt-4">
        <Table<ICategory>
          columns={columnCategory(getSorterProps)}
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

export default ListCategory;
