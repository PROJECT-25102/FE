import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, QRCode, Table } from "antd";
import dayjs from "dayjs";
import { Link, useParams } from "react-router";
import { DAYOFWEEK_LABEL } from "../../../../common/constants/dayOfWeek";
import { QUERYKEY } from "../../../../common/constants/queryKey";
import { STATUS_TICKET } from "../../../../common/constants/ticket";
import { getDetailMyTicket } from "../../../../common/services/user.service";
import { formatCurrency } from "../../../../common/utils";
import {
  customStatusRender,
  getStatusQrCode,
} from "../../../../common/utils/qrCode";
const column = [
  {
    title: "Phòng chiếu",
    dataIndex: "roomName",
  },
  {
    title: "Số vé",
    dataIndex: "ticketCount",
  },
  {
    title: "Ghế",
    dataIndex: "seats",
  },
];

const DetailTicket = () => {
  const { ticketId } = useParams();
  const { data } = useQuery({
    queryKey: [QUERYKEY.TICKET, QUERYKEY.TICKET.USER, ticketId],
    queryFn: () => getDetailMyTicket(ticketId as string),
  });
  const rowData = [
    {
      key: 1,
      roomName: data?.data.roomName,
      ticketCount: data?.data.items?.length,
      seats: data?.data.items?.map((item) => item.seatLabel).join(", "),
    },
  ];

  return (
    <div className="max-w-7xl xl:mx-auto mx-6">
      <div className="flex items-center mt-20">
        <div className="flex flex-col flex-1/4 gap-2 items-center justify-center">
          {data && data.data.status === STATUS_TICKET.CANCELLED ? (
            <>
              <CloseCircleOutlined className="text-red-500! text-7xl" />
              <p className="text-2xl text-white font-bold">Vé đã bị huỷ</p>

              <p className="text-center text-base text-red-400">
                Lý do huỷ:
                <br />
                <span className="font-medium text-white">
                  {data.data.cancelDescription || "Không có lý do"}
                </span>
              </p>
              <p className="text-center text-base">
                Mọi vấn đề cần giải đáp, xin vui lòng liên hệ: 024.3514791
              </p>
            </>
          ) : (
            <>
              <CheckCircleOutlined className="text-green-500! text-7xl" />
              <p className="text-2xl text-white font-bold">
                Giao dịch thành công
              </p>
              <p className="text-center text-base">
                Cảm ơn quý khách đã đặt vé
                <br />
                Quý khách vui lòng lưu lại thông tin mã vé trên màn hình để lấy
                vé vào xem
                <br />
                Mọi vấn đề cần giải đáp, xin vui lòng liên hệ: 024.3514791
              </p>
            </>
          )}

          <Link to={"/contact"}>
            <Button type="primary" className="px-8! rounded-full! mt-2">
              Liên hệ
            </Button>
          </Link>
        </div>

        <div className="bg-[#1a1d23] flex-1 p-6 rounded-xl">
          <h2 className="text-center text-lg font-semibold">Thông tin vé</h2>
          <p className="mt-4 uppercase font-bold text-lg line-clamp-1">
            {data?.data?.movieName}
          </p>
          <div className="flex items-start mt-4 justify-between">
            <div>
              <p className="text-gray-300/50 text-base">Người đặt</p>
              <p className="font-semibold text-base">
                {data?.data.customerInfo.userName}
              </p>
              <p className="text-gray-300/50 mt-4 text-base">Mã đặt vé</p>
              <p className="font-semibold text-base uppercase">
                {data?.data.ticketId || data?.data._id}
              </p>
            </div>
            <QRCode
              value={data?.data.qrCode as string}
              size={120}
              status={getStatusQrCode(data?.data.status)}
              statusRender={customStatusRender}
            />
          </div>
          <p className="text-gray-300/50 text-base mt-4">Người đặt</p>
          <p className="text-lg text-orange-500 font-semibold">
            {dayjs(data?.data.startTime).format("HH:mm")}
          </p>
          <p className="text-lg font-semibold">
            {DAYOFWEEK_LABEL[dayjs(data?.data.startTime).day()]} -{" "}
            {dayjs(data?.data.startTime).format("DD/MM/YYYY")}
          </p>
          {data?.data.cancelDescription && (
            <p className="text-gray-300/50 text-base mt-4">Lý do huỷ</p>
          )}
          <p
            className={` text-lg ${data?.data.cancelDescription ? "text-red-500" : "text-blue-500 mt-4"}`}
          >
            {data?.data.cancelDescription
              ? data.data.cancelDescription
              : ` Khán giả vui lòng dùng mã này lên thẳng phòng chiếu. Không cần đổi
            sang vé giấy`}
          </p>
          <div className="mt-4">
            <Table
              columns={column}
              dataSource={rowData}
              pagination={false}
              bordered
            />
          </div>
          <div className="flex itesm-center justify-between mt-4">
            <p className="text-gray-300/50 text-base">Tổng tiền</p>
            <p className="text-lg font-semibold">
              {data && formatCurrency(data.data.totalPrice as number)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTicket;
