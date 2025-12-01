import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { seatTypeColor } from "../../../../../common/constants";
import { QUERYKEY } from "../../../../../common/constants/queryKey";
import {
  SEAT_STATUS,
  SEAT_STATUS_COLOR,
} from "../../../../../common/constants/seat";
import { useMessage } from "../../../../../common/hooks/useMessage";
import { useUnHoldOnBack } from "../../../../../common/hooks/useUnHoldOnBack";
import {
  getSeatShowtime,
  toggleSeat,
} from "../../../../../common/services/seat.showtime.service";
import { useAuthSelector } from "../../../../../common/stores/useAuthStore";
import {
  getStatusSeat,
  getStyleSeatCard,
} from "../../../../../common/utils/seat";
import CountTime from "../../../../../components/CountTime";
import { getSocket } from "../../../../../socket/socket-client";
import { formatCurrency, getSeatPrice } from "../../../../../common/utils";

const SeatPicker = () => {
  const nav = useNavigate();
  const { showtimeId, roomId } = useParams();
  const [searchParams] = useSearchParams();
  const hour = searchParams.get("hour");
  useUnHoldOnBack();
  const userId = useAuthSelector((state) => state.user?._id);
  const { data, isLoading } = useQuery({
    queryKey: [QUERYKEY.SEAT, showtimeId, roomId],
    queryFn: () =>
      getSeatShowtime(roomId as string, showtimeId as string, { status: true }),
  });
  const socket = getSocket();
  const { HandleError } = useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (payload: string) =>
      toggleSeat({ showtimeId: showtimeId as string, seatId: payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes(QUERYKEY.SEAT),
      });
    },
    onError: (err) => HandleError(err),
  });

  const myHoldSeats = data?.data.seats.filter(
    (seat) => seat.bookingStatus === SEAT_STATUS.HOLD && seat.userId === userId,
  );

  const total = myHoldSeats?.reduce((sum, seat) => {
    return sum + getSeatPrice(seat);
  }, 0);

  useEffect(() => {
    const handleSeatUpdate = () => {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes(QUERYKEY.SEAT),
      });
    };
    socket.emit("joinShowtime", showtimeId);
    socket.on("seatUpdated", handleSeatUpdate);
    return () => {
      socket.off("seatUpdated", handleSeatUpdate);
    };
  }, [queryClient, showtimeId, socket]);
  const handleNavCheckout = () => {
    nav("/checkout");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="min-h-[80vh]  mt-12">
      <div className="flex flex-col items-center">
        {isLoading ? (
          <div className="flex items-center flex-col justify-center gap-5 min-h-[40vh]">
            <p className="text-base">Đang tải phòng chiếu</p>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-base">
                  Giờ chiếu: <span className="font-bold text-lg">{hour}</span>
                </p>
                <div className="flex items-end">
                  <p className="text-base">Thời gian còn lại: </p>
                  <CountTime />
                </div>
              </div>
              <div
                className="mb-6 text-center font-semibold text-black"
                style={{
                  width: `${(data?.data.cols as number) * 50 + ((data?.data.cols as number) - 1) * 8}px`,
                  height: "40px",
                  background: "linear-gradient(to bottom, #facc15, #eab308)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)",
                }}
              >
                MÀN HÌNH
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${data?.data.cols}, 40px)`,
                gridTemplateRows: `repeat(${data?.data.rows}, 40px)`,
                gap: "8px",
              }}
            >
              {data?.data.seats.map((seat) => {
                const isMyHold = seat.userId === userId;
                return (
                  <div
                    onClick={() => {
                      if (seat.bookingStatus === SEAT_STATUS.HOLD && !isMyHold)
                        return;
                      if (seat.bookingStatus === SEAT_STATUS.BOOKED) return;
                      mutate(seat._id);
                    }}
                    key={seat._id}
                    style={{
                      ...getStyleSeatCard(
                        seat,
                        getStatusSeat(seat.bookingStatus, isMyHold),
                      ),
                    }}
                  >
                    {seat.bookingStatus === SEAT_STATUS.BOOKED ? (
                      <img
                        src={`https://res.cloudinary.com/dpplfiyki/image/upload/v1764580281/The%CC%82m_tie%CC%82u_%C4%91e%CC%82%CC%80_lbgdt5.png`}
                        alt=""
                      />
                    ) : (
                      seat.label
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className="max-w-7xl xl:mx-auto mx-6">
        <p className="mt-6">Tình trạng ghế:</p>
        <div className="mt-4  flex gap-4">
          <div className="flex items-center gap-2">
            <div
              className="rounded-md"
              style={{
                backgroundImage: `url("https://res.cloudinary.com/dpplfiyki/image/upload/v1764580281/The%CC%82m_tie%CC%82u_%C4%91e%CC%82%CC%80_lbgdt5.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: 40,
                backgroundColor: SEAT_STATUS_COLOR[SEAT_STATUS.BOOKED],
                height: 40,
              }}
            />

            <p>Ghế đã đặt</p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="rounded-md"
              style={{
                backgroundImage: `url("https://res.cloudinary.com/dpplfiyki/image/upload/v1764580281/The%CC%82m_tie%CC%82u_%C4%91e%CC%82%CC%80_lbgdt5.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: 40,
                backgroundColor: SEAT_STATUS_COLOR[SEAT_STATUS.MYBOOKED],
                height: 40,
              }}
            />

            <p>Ghế của bạn</p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="rounded-md"
              style={{
                background: SEAT_STATUS_COLOR["HOLD"],
                width: 40,
                height: 40,
              }}
            />
            <p>Ghế đang giữ</p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="rounded-md"
              style={{
                background: SEAT_STATUS_COLOR["MYHOLD"],
                width: 40,
                height: 40,
              }}
            />
            <p>Ghế bạn đang giữ</p>
          </div>
        </div>
        <p className="mt-6">Loại ghế:</p>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div
              className="rounded-md"
              style={{
                background: seatTypeColor["NORMAL"],
                width: 40,
                height: 40,
              }}
            />
            <p>Ghế thường</p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="rounded-md"
              style={{
                background: seatTypeColor["VIP"],
                width: 40,
                height: 40,
              }}
            />
            <p>Ghế VIP</p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="rounded-md"
              style={{
                background: seatTypeColor["COUPLE"],
                width: 40,
                height: 40,
              }}
            />
            <p>Ghế đôi</p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="rounded-md"
              style={{
                background: `#ef4444`,
                width: 40,
                height: 40,
              }}
            />
            <p>Ghế không khả dụng</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between max-w-7xl xl:mx-auto mx-6 mt-8">
        <div>
          <p className="text-lg">
            Ghế đã chọn:{" "}
            <span className="font-semibold">
              {myHoldSeats?.map((item) => item.label).join(", ")}
            </span>
          </p>
          <p className="text-lg">
            Tổng tiền:{" "}
            <span className="font-semibold">{formatCurrency(total || 0)}</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => nav(-1)}
            style={{
              padding: "20px 30px",
              borderRadius: `calc(infinity * 1px)`,
            }}
          >
            Quay về
          </Button>
          <Button
            onClick={handleNavCheckout}
            disabled={!myHoldSeats?.length}
            type="primary"
            style={{
              padding: "20px 30px",
              borderRadius: `calc(infinity * 1px)`,
            }}
          >
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SeatPicker;
