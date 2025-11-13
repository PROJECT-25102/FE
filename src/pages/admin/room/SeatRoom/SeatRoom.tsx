import { useQuery } from "@tanstack/react-query";
import { Spin, Tag } from "antd";
import { useNavigate, useParams } from "react-router";
import { seatTypeColor } from "../../../../common/constants";
import { QUERYKEY } from "../../../../common/constants/queryKey";
import SeatPopover from "./components/SeatPopover";
import { getSeatByRoom } from "../../../../common/services/room.service";

const SeatRoom = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: [QUERYKEY.SEAT],
    queryFn: () => getSeatByRoom(id as string),
  });

  const totalNormalSeat =
    data?.data.seats.filter(
      (item) => item.type === "NORMAL" && item.status !== false,
    ).length ?? 0;
  const totalVipSeat =
    data?.data.seats.filter((item) => item.type === "VIP").length ?? 0;
  const totalCoupleSeat =
    data?.data.seats.filter((item) => item.type === "COUPLE").length ?? 0;
  const totalDisableSeat =
    data?.data.seats.filter((item) => !item.status).length ?? 0;
  return (
    <div className="bg-[#121822] w-full min-h-[70dvh] rounded-md shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          <Tag className="text-base!">{data?.data.name}</Tag>{" "}
          {data?.data.seats.length !== 0 && `${data?.data.seats.length} ghế`}
        </h3>
        <p
          onClick={() => nav(-1)}
          className="text-white! hover:text-primary! hover:underline! cursor-pointer"
        >
          Quay về danh sách
        </p>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[70vh]">
          <Spin />
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-2 justify-center mt-4">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${data?.data.cols}, 60px)`,
                gridTemplateRows: `repeat(${data?.data.rows}, 60px)`,
                gap: "8px",
              }}
            >
              {data?.data.seats.map((seat) => (
                <SeatPopover seat={seat} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <Tag color={seatTypeColor["NORMAL"]}>
              <p className="py-2 px-4 text-sm">
                Ghế thường: {totalNormalSeat} / {data?.data.seats.length}
              </p>
            </Tag>
            <Tag color={seatTypeColor["VIP"]}>
              <p className="py-2 px-4 text-sm">
                Ghế vip: {totalVipSeat} / {data?.data.seats.length}
              </p>
            </Tag>
            <Tag color={seatTypeColor["COUPLE"]}>
              <p className="py-2 px-4 text-sm">
                Ghế đôi: {totalCoupleSeat} / {data?.data.seats.length}
              </p>
            </Tag>
            <Tag color={"#ef4444"}>
              <p className="py-2 px-4 text-sm">
                Ghế bị khoá ({totalDisableSeat} / {data?.data.seats.length})
              </p>
            </Tag>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatRoom;
