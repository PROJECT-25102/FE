import { useQuery } from "@tanstack/react-query";
import { Pagination, Table, Tag, type TableProps } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { QUERYKEY } from "../../../common/constants/queryKey";
import {
  TICKET_STATUS,
  TICKET_STATUS_COLOR,
} from "../../../common/constants/ticket";
import { useTableHook } from "../../../common/hooks/useTableHook";
import { getMyTicket } from "../../../common/services/user.service";
import { useAuthSelector } from "../../../common/stores/useAuthStore";
import type { ITicket } from "../../../common/types/ticket";
import { formatCurrency } from "../../../common/utils";

const MyTicket = () => {
  const columns = [
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Ngày giao dịch</p>,
      dataIndex: "createdAt",
      key: "createdAt",
      width: 350,
      render: (createdAt: string) => (
        <p className="line-clamp-1">
          {dayjs(createdAt).format("HH:mm, [Ngày] DD [Tháng] MM [Năm] YYYY")}
        </p>
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Tên phim</p>,
      dataIndex: "movieName",
      key: "movieName",
      render: (movieName: string) => (
        <p className="font-semibold line-clamp-1">{movieName}</p>
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Số vé</p>,
      dataIndex: "items",
      key: "items",
      render: (items: any[]) => (
        <p className="font-semibold line-clamp-1">{items.length}</p>
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Trạng thái vé</p>,
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Đã mua", value: "PENDING" },
        { text: "Đã sử dụng", value: "CONFIRMED" },
        { text: "Đã bị huỷ", value: "CANCELLED" },
      ],
      render: (status: string) => (
        <Tag color={TICKET_STATUS_COLOR[status]} className="font-semibold!">
          {TICKET_STATUS[status]}
        </Tag>
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Số tiền</p>,
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice: number) => (
        <p className="font-semibold line-clamp-1">
          {formatCurrency(totalPrice)}
        </p>
      ),
    },
  ];
  const navigate = useNavigate();
  const userId = useAuthSelector((state) => state.user?._id);
  const { query, onFilter, onSelectPaginateChange } =
    useTableHook<ITicket>("my_ticket");
  const { data } = useQuery({
    queryKey: [
      QUERYKEY.TICKET,
      QUERYKEY.TICKET.USER,
      userId,
      ...Object.values(query),
    ],
    queryFn: () => getMyTicket({ pagination: true, ...query }),
  });
  const onChange: TableProps<ITicket>["onChange"] = (_, filters, sorter) => {
    onFilter(filters, sorter);
  };
  return (
    <div className="mt-12 max-w-7xl xl:mx-auto mx-6">
      <Table<ITicket>
        columns={columns}
        bordered
        dataSource={data?.data}
        onChange={onChange}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => navigate(`/ticket/${record._id}`),
            style: { cursor: "pointer" },
          };
        }}
      />
      <div className="mt-4">
        <Pagination
          align="end"
          current={data?.meta?.page}
          pageSize={data?.meta?.limit}
          total={data?.meta?.total}
          onChange={onSelectPaginateChange}
        />
      </div>
    </div>
  );
};

export default MyTicket;
