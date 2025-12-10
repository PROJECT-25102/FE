import { Modal, QRCode, Table } from "antd";
import React, { useState, type ReactElement } from "react";
import type { ITicket } from "../../../../common/types/ticket";
import {
  customStatusRender,
  getStatusQrCode,
} from "../../../../common/utils/qrCode";
import dayjs from "dayjs";
import { DAYOFWEEK_LABEL } from "../../../../common/constants/dayOfWeek";
import { formatCurrency } from "../../../../common/utils";
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

const ModalDetailTicket = ({
  children,
  ticket,
}: {
  children: ReactElement;
  ticket: ITicket;
}) => {
  const [open, setOpen] = useState(false);
  const rowData = [
    {
      key: 1,
      roomName: ticket.roomName,
      ticketCount: ticket.items?.length,
      seats: ticket.items?.map((item) => item.seatLabel).join(", "),
    },
  ];
  return (
    <>
      {React.cloneElement(children, {
        onClick: () => setOpen(true),
      } as { onClick: () => void })}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        width={900}
        className="rounded-xl border border-white/10  backdrop-blur-md"
        style={{
          background: `hsl(222.2 84% 4.9%)`,
        }}
        title="Chi tiết vé"
        footer={null}
      >
        <div className="bg-[#1a1d23] flex-1 p-6 rounded-xl">
          <h2 className="text-center text-lg font-semibold">Thông tin vé</h2>
          <p className="mt-4 uppercase font-bold text-lg line-clamp-1">
            {ticket.movieName}
          </p>
          <div className="flex items-start mt-4 justify-between">
            <div>
              <p className="text-gray-300/50 text-base">Người đặt</p>
              <p className="font-semibold text-base">
                {ticket.customerInfo.userName}
              </p>
              <p className="text-gray-300/50 mt-4 text-base">Mã đặt vé</p>
              <p className="font-semibold text-base uppercase">
                {ticket.ticketId || ticket._id}
              </p>
            </div>
            <QRCode
              value={ticket.qrCode as string}
              size={120}
              status={getStatusQrCode(ticket.status)}
              statusRender={customStatusRender}
            />
          </div>
          <p className="text-gray-300/50 text-base mt-4">Người đặt</p>
          <p className="text-lg text-orange-500 font-semibold">
            {dayjs(ticket.startTime).format("HH:mm")}
          </p>
          <p className="text-lg font-semibold">
            {DAYOFWEEK_LABEL[dayjs(ticket.startTime).day()]} -{" "}
            {dayjs(ticket.startTime).format("DD/MM/YYYY")}
          </p>
          {ticket?.cancelDescription && (
            <p className="text-gray-300/50 text-base mt-4">Lý do huỷ</p>
          )}
          <p
            className={` text-lg ${ticket?.cancelDescription ? "text-red-500" : "text-blue-500 mt-4"}`}
          >
            {ticket?.cancelDescription
              ? ticket?.cancelDescription
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
              {ticket && formatCurrency(ticket.totalPrice as number)}
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalDetailTicket;
