import { Watermark } from "antd";
import dayjs from "dayjs";
import { forwardRef } from "react";
import type { ITicket } from "../../../../../common/types/ticket";

const TicketPrint = forwardRef<HTMLDivElement, { ticket: ITicket }>(
  ({ ticket }, ref) => {
    const seats: string[] = ticket.items.flatMap((item) =>
      item.seatLabel.split("-"),
    );
    const seatLabels = seats.map((item) => ({ seatLabel: item }));
    return (
      <div ref={ref} className="print-wrapper">
        <Watermark content={"BEESTAR"}>
          {seatLabels.map((seat: any, index: number) => (
            <div className="ticket" key={index}>
              <div className="ticket-header flex flex-col items-center">
                <p className="subtitle font-semibold">THE VAO</p>
                <p className="subtitle font-semibold">PHONG CHIEU PHIM</p>
                <p className="subtitle font-semibold">{ticket.ticketId}</p>
              </div>
              <p className="font-thin">====================================</p>
              <p className="text-lg">
                <strong>{ticket.movieName}</strong>
              </p>
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {dayjs(ticket.startTime).format("DD/MM/YYYY")}
                </p>
                <p className="font-medium">
                  {dayjs(ticket.startTime).format("HH:mm")}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-semibold">{ticket.roomName}</p>
                <p className="font-semibold">{seat.seatLabel}</p>
              </div>
              <p className="font-thin">====================================</p>
              <div className="footer">
                <p className="text-xs text-center">
                  Vui lòng vào phòng chiếu đúng giờ để không ảnh hưởng đến trải
                  nghiệm xem phim
                </p>
              </div>
            </div>
          ))}
        </Watermark>
      </div>
    );
  },
);

export default TicketPrint;
