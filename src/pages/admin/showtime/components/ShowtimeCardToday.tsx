import {
  EditOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Badge, Button, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import type { IShowtime } from "../../../../common/types/showtime";
import {
  SHOWTIME_STATUS,
  SHOWTIME_STATUS_BADGE,
} from "../../../../common/constants/showtime";
import { formatCurrency } from "../../../../common/utils";
import ModalUpdateShowtime from "../showtimeMovie/components/ModalUpdateShowtime";

const ShowtimeCardToday = ({ item }: { item: IShowtime }) => {
  const values = item.price.map((item) => item.value);
  const minPrice = Math.min(...values);
  const maxPrice = Math.max(...values);
  return (
    <Badge.Ribbon
      color={SHOWTIME_STATUS_BADGE[item.status].color}
      text={
        <>
          {item.status === SHOWTIME_STATUS.CANCELLED ? (
            <div>
              <Tooltip title={`Lý do huỷ: ${item.cancelDescription}`}>
                <EyeOutlined />
              </Tooltip>
              {SHOWTIME_STATUS_BADGE[item.status].label}
            </div>
          ) : (
            <p>{SHOWTIME_STATUS_BADGE[item.status].label}</p>
          )}
        </>
      }
    >
      <div
        key={item._id}
        className="p-4  border border-gray-500/50 bg-gray-300/5 shadow-md rounded-md"
      >
        <p className="uppercase font-semibold text-lg line-clamp-1">
          {item.movieId.name}
        </p>
        <div className="flex items-center justify-between mt-2">
          <div className="text-gray-300/80">
            <p>
              {dayjs(item.startTime).format("[Ngày] DD [Tháng] MM [Năm] YYYY")}
            </p>
            <p className="text-base font-semibold">
              {dayjs(item.startTime).format("HH:mm")} -{" "}
              {dayjs(item.startTime)
                .add(item.movieId.duration, "minutes")
                .format("HH:mm")}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 ">
          <p className="text-gray-300/50 ">
            <EnvironmentOutlined />
            {item.roomId.name}
          </p>
          <Tag
            color={`${(item.bookedCount as number) > 0 ? `#ef4444` : `#666666`}`}
          >
            {item.bookedCount || 0}/{item.roomId.capacity}
          </Tag>
        </div>
        <div className="mt-2">
          <p className="text-green-500">
            {formatCurrency(minPrice)} - {formatCurrency(maxPrice)}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          {item.status !== SHOWTIME_STATUS.ENDED && (
            <>
              {item.status === SHOWTIME_STATUS.IN_PROGRESS &&
              item.status !== SHOWTIME_STATUS.ENDED ? (
                <Tooltip
                  title={`Không thể chỉnh sửa suất chiếu khi ${item.status === SHOWTIME_STATUS.ENDED ? "suất chiếu đã kết thúc" : "đang trong thời gian chiếu"}`}
                >
                  <Button className="flex-1" icon={<EditOutlined />} disabled>
                    Chỉnh sửa
                  </Button>
                </Tooltip>
              ) : (
                <ModalUpdateShowtime showtime={item}>
                  <Button className="flex-1" icon={<EditOutlined />}>
                    Chỉnh sửa
                  </Button>
                </ModalUpdateShowtime>
              )}
            </>
          )}
          <Button className="flex-1" icon={<TeamOutlined />}>
            Ghế
          </Button>
        </div>
      </div>
    </Badge.Ribbon>
  );
};

export default ShowtimeCardToday;
