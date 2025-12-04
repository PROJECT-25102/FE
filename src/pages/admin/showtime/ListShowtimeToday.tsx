import { useQuery } from "@tanstack/react-query";
import { Button, Pagination } from "antd";
import { Link } from "react-router";
import { QUERYKEY } from "../../../common/constants/queryKey";
import { useTableHook } from "../../../common/hooks/useTableHook";
import { getAllShowtime } from "../../../common/services/showtime.service";
import ShowtimeCardToday from "./components/ShowtimeCardToday";
import FilterShowtimeToday from "./components/FilterShowtimeToday";
import dayjs from "dayjs";

const ListShowtimeToday = () => {
  const { query, onSelectPaginateChange } = useTableHook("showtimeToday");
  const { data } = useQuery({
    queryKey: [QUERYKEY.SHOWTIME, "ALL", ...Object.values(query)],
    queryFn: () =>
      getAllShowtime({
        sort: "startTime",
        order: "asc",
        startTimeFrom: dayjs().startOf("day").toISOString(),
        limit: 8,
        pagination: true,
        ...query,
      }),
  });
  return (
    <div className="bg-[#121822] w-full min-h-[87vh] rounded-md shadow-md px-6 py-4">
      <div className="flex items-center gap-3">
        <h3 className="text-base">Quản Lý Lịch Chiếu</h3>
        <div className="flex items-center gap-2">
          <Link to={`/admin/showtime`}>
            <Button>Lịch chiếu theo phim</Button>
          </Link>
          <Button type="primary">Tất cả lịch chiếu</Button>
        </div>
      </div>
      <div>
        <FilterShowtimeToday />
      </div>
      <div className="grid grid-cols-4 gap-8 mt-8">
        {data?.data.map((item) => (
          <ShowtimeCardToday key={item._id} item={item} />
        ))}
      </div>
      <div className="mt-4">
        <Pagination
          onChange={onSelectPaginateChange}
          total={data?.meta?.total}
          pageSize={data?.meta?.limit}
          current={data?.meta?.page}
          align="end"
        />
      </div>
    </div>
  );
};

export default ListShowtimeToday;
