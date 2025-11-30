import { CalendarOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Image, Pagination, Spin, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router";
import { DAYOFWEEK_LABEL } from "../../../../common/constants/dayOfWeek";
import { QUERYKEY } from "../../../../common/constants/queryKey";
import { useTableHook } from "../../../../common/hooks/useTableHook";
import { getDetailMovie } from "../../../../common/services/movie.service";
import { getShowtimeWeekday } from "../../../../common/services/showtime.service";
import type { ICategory } from "../../../../common/types/category";
import type { IMovie } from "../../../../common/types/movie";
import { getAgeBadge } from "../../../../common/utils/agePolicy";
import FilterShowtimeInMovie from "./components/FilterShowtimeInMovie";
import ShowtimeCard from "./components/ShowtimeCard";
import CreateShowtimeModal from "./create/CreateShowtimeModal";

const ListShowtimeInMovie = () => {
  const { id: movieId } = useParams();
  const { query, onSelectPaginateChange } = useTableHook("showtime");
  const { data: movieData, isLoading: isLoadingMovie } = useQuery({
    queryKey: [QUERYKEY.MOVIE, movieId],
    queryFn: () => getDetailMovie(movieId as string),
  });
  const movie = movieData?.data || ({} as IMovie);
  const { data, isLoading } = useQuery({
    queryKey: [
      QUERYKEY.SHOWTIME,
      movieId,
      ...Object.values(query),
      ...Object.keys(query),
    ],
    queryFn: () =>
      getShowtimeWeekday({
        movieId,
        sort: "startTime",
        order: "asc",
        limit: 2,
        startTimeFrom: dayjs().startOf("day").toISOString(),
        ...query,
      }),
    enabled: !!movie,
  });
  const { color, label, description, text } = getAgeBadge(movie.ageRequire);
  return (
    <div>
      {isLoadingMovie && movie ? (
        <div className="flex justify-center items-center h-[80vh]">
          <Spin />
        </div>
      ) : (
        <>
          <div className="bg-primary/5 gap-6 py-6 px-8 border-b-gray-700/80 border-b">
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: "1fr 4fr" }}
            >
              <div className="rounded-md h-58 w-full overflow-hidden">
                <Image src={movie.poster} className="object-cover" />
              </div>
              <div>
                <h3 className="line-clamp-1 text-xl font-semibold">
                  {movie.name}
                </h3>
                <p className="line-clamp-3 mt-2 text-gray-300/70">
                  {movie.description}
                </p>
                <p className="mt-2 text-gray-300/70 line-clamp-1">
                  <span className="text-white">Thời lượng:</span>{" "}
                  {movie.duration} phút
                </p>
                <p className="mt-2 text-gray-300/70 line-clamp-1">
                  <span className="text-white">Thể loại:</span>{" "}
                  {(movie?.category as ICategory[])
                    .filter((c) => c.status)
                    .map((c) => c.name)
                    .join(", ") || "Chưa cập nhật"}
                </p>
                <Tooltip title={description} className="mt-2! cursor-pointer!">
                  <Tag color={color}>
                    {label} - {text}
                  </Tag>
                </Tooltip>
              </div>
            </div>
            <FilterShowtimeInMovie />
          </div>
          {isLoading ? (
            <div className="flex min-h-[20vh] items-center justify-center">
              <Spin size="default" />
            </div>
          ) : (
            <div className="px-8 py-4">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-lg font-medium">Lịch chiếu</p>
                  <p className="text-xs text-gray-300/50 mt-2">
                    {data?.meta?.total} Ngày chiếu
                  </p>
                </div>
                <div>
                  <CreateShowtimeModal movie={movie}>
                    <Button>Thêm lịch chiếu</Button>
                  </CreateShowtimeModal>
                </div>
              </div>
              {data?.data && Object.entries(data?.data).length === 0 && (
                <div className="min-h-[35vh] flex items-center justify-center">
                  <p className="text-red-500">Không có lịch chiếu nào</p>
                </div>
              )}
              {data?.data &&
                Object.entries(data.data).length !== 0 &&
                Object.entries(data.data).map(([date, showtimes]) => (
                  <div key={date} className="mb-6">
                    <div className="text-base flex items-center gap-2">
                      <CalendarOutlined className="text-primary!" />
                      <p className="font-medium">
                        {DAYOFWEEK_LABEL[dayjs(date).day()]},{" "}
                        {dayjs(date).format("DD/MM")}
                      </p>
                    </div>
                    <div
                      className="grid gap-4 mt-4"
                      style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
                    >
                      {showtimes.map((item) => (
                        <ShowtimeCard item={item} />
                      ))}
                    </div>
                  </div>
                ))}
              <div>
                <Pagination
                  onChange={onSelectPaginateChange}
                  current={data?.meta?.page}
                  align="end"
                  total={data?.meta?.total}
                  pageSize={data?.meta?.limit}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ListShowtimeInMovie;
