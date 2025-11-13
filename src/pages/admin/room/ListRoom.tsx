import { FileAddOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Pagination, Table, type TableProps } from "antd";
import { Link } from "react-router";
import { QUERYKEY } from "../../../common/constants/queryKey";
import { getAllRoom } from "../../../common/services/room.service";
import { useTableHook } from "../../../common/hooks/useTableHook";
import type { IRoom } from "../../../common/types/room";
import { columnRoom } from "./components/Column";
import FilterRoom from "./components/FilterRoom";

const ListRoom = () => {
  const { query, onSelectPaginateChange, getSorterProps, onFilter } =
    useTableHook<IRoom>();
  const { data, isLoading } = useQuery({
    queryKey: [QUERYKEY.ROOM, ...Object.values(query)],
    queryFn: () =>
      getAllRoom({
        ...query,
        searchFields: ["name"],
        pagination: true,
        limit: 10,
      }),
  });
  const onChangeTable: TableProps<IRoom>["onChange"] = (_, filters, sorter) => {
    onFilter(filters, sorter);
  };
  return (
    <div className="bg-[#121822] w-full min-h-[70dvh] rounded-md shadow-md px-6 py-4">
      <h3 className="text-lg font-semibold">Danh sách phim</h3>
      <div className="flex justify-between items-center mt-4">
        <FilterRoom />
        <Link to={"/admin/room/create"}>
          <Button
            style={{ height: 35 }}
            type="primary"
            icon={<FileAddOutlined />}
          >
            Thêm phòng chiếu
          </Button>
        </Link>
      </div>
      <div className="mt-4">
        <Table<IRoom>
          columns={columnRoom(getSorterProps)}
          onChange={onChangeTable}
          dataSource={data?.data || []}
          loading={isLoading}
          scroll={{
            x: "horizontal",
          }}
          bordered
          pagination={false}
        />
        {!isLoading && data && (
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

export default ListRoom;
