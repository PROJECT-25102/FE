import { RetweetOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, DatePicker, Select } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { QUERYKEY } from "../../../../common/constants/queryKey";
import {
  SHOWTIME_STATUS,
  SHOWTIME_STATUS_BADGE,
} from "../../../../common/constants/showtime";
import { useTableHook } from "../../../../common/hooks/useTableHook";
import { getAllMovie } from "../../../../common/services/movie.service";
import { getAllRoom } from "../../../../common/services/room.service";
import type { IShowtimeStatus } from "../../../../common/types/showtime";

const { RangePicker } = DatePicker;

const FilterShowtimeToday = () => {
  const { id } = useParams<{ id: string }>();
  const { query, onFilter, resetFilter } = useTableHook("showtimeToday");
  const { data } = useQuery({
    queryKey: [QUERYKEY.ROOM],
    queryFn: () => getAllRoom({ status: true }),
  });
  const movieResponse = useQuery({
    queryKey: [QUERYKEY.MOVIE, "STATUS-TRUE"],
    queryFn: () => getAllMovie(),
  });
  const [date, setDate] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs().startOf("day"),
    null,
  ]);
  const handleChangeRangePicker: RangePickerProps["onChange"] = (dates) => {
    const startTimeFrom = dates?.[0]
      ? dates[0].startOf("day").toISOString()
      : "";
    const startTimeTo = dates?.[1] ? dates[1].endOf("day").toISOString() : "";
    onFilter({
      startTimeFrom: [startTimeFrom],
      startTimeTo: [startTimeTo],
    });
    setDate(dates ?? [null, null]);
  };
  useEffect(() => {
    setDate([dayjs().startOf("day"), null]);
  }, [id]);
  useEffect(() => {
    setDate([
      dayjs(query.startTimeFrom),
      query.startTimeTo ? dayjs(query.startTimeTo) : null,
    ]);
  }, [query.startTimeFrom, query.startTimeTo]);

  return (
    <div className="mt-6 flex items-end gap-4">
      <div>
        <p className="mb-2">Lọc theo khoảng ngày</p>
        <RangePicker
          value={date}
          placeholder={["Từ ngày", "Đến ngày"]}
          onChange={handleChangeRangePicker}
        />
      </div>
      <div>
        <p className="mb-2">Phim</p>
        <Select
          placeholder="Chọn phim"
          allowClear
          showSearch
          optionFilterProp="label"
          value={query.movieId}
          onChange={(e) => {
            onFilter({ movieId: [e] });
          }}
          style={{ width: 200 }}
          options={movieResponse?.data?.data?.map((item) => ({
            value: item._id,
            label: item.name,
            image: item.poster,
          }))}
          optionRender={(otps) => {
            const { data: movie } = otps;
            return (
              <div className="flex items-center gap-4">
                <img src={movie.image} className="w-8 h-12 rounded-md" alt="" />
                <p className="text-gray-300/90">{movie.label}</p>
              </div>
            );
          }}
        />
      </div>
      <div>
        <p className="mb-2">Phòng chiếu</p>
        <Select
          placeholder="Chọn phòng chiếu"
          allowClear
          value={query.roomId}
          onChange={(e) => {
            onFilter({ roomId: [e] });
          }}
          style={{ width: 200 }}
          options={data?.data.map((item) => ({
            value: item._id,
            label: item.name,
          }))}
        />
      </div>
      <div>
        <p className="mb-2">Trạng thái</p>
        <Select
          placeholder="Chọn trạng thái"
          defaultValue={query.status || ""}
          allowClear
          value={query.status}
          onChange={(e) => {
            onFilter({ status: e ? [e] : [] });
          }}
          style={{ width: 150 }}
          options={[
            { value: "", label: "Tất cả trạng thái" },
            ...Object.values(SHOWTIME_STATUS).map((item) => ({
              value: item,
              label: SHOWTIME_STATUS_BADGE[item as IShowtimeStatus].label,
            })),
          ]}
        />
      </div>
      <Button onClick={() => resetFilter()} icon={<RetweetOutlined />}>
        Đặt lại
      </Button>
    </div>
  );
};

export default FilterShowtimeToday;
