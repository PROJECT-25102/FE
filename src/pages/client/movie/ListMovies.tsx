import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { QUERYKEY } from "../../../common/constants/queryKey";
import { getWeekdayHasShowtime } from "../../../common/services/showtime.service";
import ListMovieHasShowtime from "./components/ListMovieHasShowtime";

const ListMovies = () => {
  const [startTimeFrom, setStartTimeFrom] = useState<string>();
  const [startTimeTo, setStartTimeTo] = useState<string>();
  const { data } = useQuery({
    queryKey: [QUERYKEY.SHOWTIME, QUERYKEY.SHOWTIME.HAS_DAY],
    queryFn: () =>
      getWeekdayHasShowtime({
        limit: 7,
        startTimeFrom: dayjs().format("YYYY-MM-DD"),
      }),
  });
  const applyTimeRange = (date: string) => {
    const today = dayjs().format("YYYY-MM-DD");
    const selectedDate = dayjs(date).format("YYYY-MM-DD");
    if (selectedDate === today) {
      setStartTimeFrom(dayjs().add(1, "hour").toISOString());
      setStartTimeTo(dayjs(date).endOf("day").toISOString());
    } else {
      setStartTimeFrom(dayjs(date).startOf("day").toISOString());
      setStartTimeTo(dayjs(date).endOf("day").toISOString());
    }
  };
  useEffect(() => {
    if (data) {
      const firstDate = data.data[0];
      applyTimeRange(firstDate);
    }
  }, [data]);
  const handleSelectDate = (item: string) => {
    applyTimeRange(item);
  };
  return (
    <div className="min-h-screen max-w-7xl xl:mx-auto mx-6">
      <div className="flex items-center justify-center gap-2 mt-8">
        <div className="w-4 h-4 bg-primary rounded-full" />
        <h2 className="text-xl font-bold">Phim đang chiếu</h2>
      </div>
      <div className="mt-4 flex justify-center gap-4">
        {data?.data.map((item: string) => {
          const isActive =
            dayjs(item).format("YYYY-MM-DD") ===
            dayjs(startTimeFrom).format("YYYY-MM-DD");
          return (
            <button
              key={item}
              onClick={() => handleSelectDate(item)}
              className={`py-3 border font-semibold transition px-3 rounded-md
                ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "border-gray-600/50 hover:bg-gray-600/50"
                }`}
            >
              {dayjs(item).format("DD-MM-YYYY")}
            </button>
          );
        })}
      </div>
      <ListMovieHasShowtime
        startTimeFrom={startTimeFrom as string}
        startTimeTo={startTimeTo as string}
      />
    </div>
  );
};

export default ListMovies;
