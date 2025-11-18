import { useQuery } from "@tanstack/react-query";
import { Button, Descriptions, Image, Spin, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import { Link, useParams } from "react-router";
import { QUERYKEY } from "../../../../common/constants/queryKey";
import { getDetailMovie } from "../../../../common/services/movie.service";
import { getAgeBadge } from "../../../../common/utils/agePolicy";
import { statusRelease } from "../../../../common/constants";

const DetailMovie = () => {
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryKey: [QUERYKEY.MOVIE, id],
    queryFn: async () => {
      const res = await getDetailMovie(id as string);
      return res.data;
    },
  });
  if (isPending) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!data) return <p>Không tìm thấy phim</p>;

  return (
    <div className="bg-[#121822] w-full min-h-[85dvh] rounded-md shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Chi tiết phim <Tag color="blue">{data.name}</Tag>
        </h3>
        <div className="flex gap-4">
          <Link
            to={`/admin/movie/update/${data._id}`}
            className="text-white! hover:text-primary! hover:underline!"
          >
            <Button type="primary">Chỉnh sửa</Button>
          </Link>
          <Link
            to="/admin/movie"
            className="text-white! hover:text-primary! hover:underline!"
          >
            <Button>Quay về</Button>
          </Link>
        </div>
      </div>

      <div className="mt-6 flex  gap-8">
        <div className="rounded-md">
          <Image
            src={data.poster}
            width={330}
            height={480}
            style={{ objectFit: "cover", borderRadius: 15 }}
          />
        </div>
        <div className="bg-[#1a2433] p-6 rounded-md shadow">
          <Descriptions
            title="Thông tin phim"
            bordered
            column={2}
            className="no-wrap-label"
            labelStyle={{ color: "#ddd", fontWeight: 500 }}
            contentStyle={{ color: "#eee" }}
          >
            <Descriptions.Item label="Tên phim" span={2}>
              {data.name}
            </Descriptions.Item>

            <Descriptions.Item label="Thời lượng">
              {data.duration} phút
            </Descriptions.Item>

            <Descriptions.Item label="Độ tuổi">
              <Tooltip title={getAgeBadge(data.ageRequire).description}>
                <Tag
                  color={getAgeBadge(data.ageRequire).color}
                  className="cursor-pointer"
                >
                  {data.ageRequire}
                </Tag>
              </Tooltip>
            </Descriptions.Item>

            <Descriptions.Item label="Thể loại" span={2}>
              {Array.isArray(data.category) &&
                data.category.map((c: any) => (
                  <Tag key={c._id} color="cyan">
                    {c.name}
                  </Tag>
                ))}
            </Descriptions.Item>

            <Descriptions.Item label="Quốc gia">
              {data.country}
            </Descriptions.Item>

            <Descriptions.Item label="Ngôn ngữ">
              {data.language}
            </Descriptions.Item>

            {data.subLanguage && (
              <Descriptions.Item label="Phụ đề">
                {data.subLanguage}
              </Descriptions.Item>
            )}

            <Descriptions.Item label="Đạo diễn" span={2}>
              {data.director}
            </Descriptions.Item>

            <Descriptions.Item label="Diễn viên" span={2}>
              {Array.isArray(data.actor) &&
                data.actor.map((a: string, idx: number) => (
                  <Tag key={idx}>{a}</Tag>
                ))}
            </Descriptions.Item>

            <Descriptions.Item label="Ngày chiếu">
              {dayjs(data.releaseDate).format("DD/MM/YYYY")}
            </Descriptions.Item>

            <Descriptions.Item label="Ngày kết thúc">
              {dayjs(data.endDate).format("DD/MM/YYYY")}
            </Descriptions.Item>

            <Descriptions.Item label="Trạng thái">
              <Tag color={statusRelease[data.statusRelease].color}>
                {statusRelease[data.statusRelease].label}
              </Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Phim nổi bật">
              <Tag color={data.isFeatured ? "gold" : "default"}>
                {data.isFeatured ? "Có" : "Không"}
              </Tag>
            </Descriptions.Item>

            {data.trailer && (
              <Descriptions.Item label="Trailer" span={2}>
                <a
                  href={data.trailer}
                  target="_blank"
                  className="text-blue-400 underline"
                >
                  Xem trailer
                </a>
              </Descriptions.Item>
            )}

            {data.description && (
              <Descriptions.Item label="Mô tả" span={2}>
                {data.description}
              </Descriptions.Item>
            )}
          </Descriptions>
        </div>
      </div>
    </div>
  );
};

export default DetailMovie;
