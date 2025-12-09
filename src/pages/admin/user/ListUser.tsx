import { Pagination, Table, type TableProps } from "antd";
import { useTableHook } from "../../../common/hooks/useTableHook";
import { useQuery } from "@tanstack/react-query";
import { QUERYKEY } from "../../../common/constants/queryKey";
import { getAllUser } from "../../../common/services/user.service";
import type { IUser } from "../../../common/types/user";
import FilterUser from "./components/FilterUser";
import { columnUser } from "./components/Column";

const ListUser = () => {
  const { query, onFilter, getSorterProps } = useTableHook<IUser>();
  const { data, isLoading } = useQuery({
    queryKey: [QUERYKEY.USER, ...Object.values(query)],
    queryFn: () =>
      getAllUser({ searchFields: ["userName", "email"], ...query }),
  });
  const onChangeTable: TableProps<IUser>["onChange"] = (_, filters, sorter) => {
    onFilter(filters, sorter);
  };
  return (
    <div className="bg-[#121822] w-full min-h-[70dvh] rounded-md shadow-md px-6 py-4">
      <h3 className="text-base">Quản lý người dùng</h3>
      <div className="mt-4">
        <FilterUser />
      </div>
      <div className="mt-6">
        <Table<IUser>
          columns={columnUser(getSorterProps)}
          scroll={{
            x: "horizontal",
          }}
          bordered
          onChange={onChangeTable}
          loading={isLoading}
          dataSource={data?.data}
          pagination={false}
        />
        <Pagination align="end" className="mt-6!" />
      </div>
    </div>
  );
};

export default ListUser;
