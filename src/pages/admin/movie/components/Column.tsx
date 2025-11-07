import {
  EditOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Button, Image, Popconfirm, Space, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router";
import type { IMovie } from "../../../../common/types/movie";
import { getAgeBadge } from "../../../../common/utils/agePolicy";
import TextNowWrap from "../../../../components/TextNowWrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMessage } from "../../../../common/hooks/useMessage";
import { updateStatusMovie } from "../../../../common/services/movie.service";
import { QUERYKEY } from "../../../../common/constants/queryKey";

export const columnMovie = (
  getSorterProps: (field: keyof IMovie) => object,
) => {
  const queryClient = useQueryClient();
  const { antdMessage, HandleError } = useMessage();
  const { mutate } = useMutation({
    mutationFn: (id: string) => updateStatusMovie(id),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(QUERYKEY.MOVIE),
      });
    },
    onError: (err) => {
      HandleError(err);
    },
  });
  return [
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Mã phim</p>,
      dataIndex: "_id",
      key: "_id",
      width: 30,
      ...getSorterProps("_id"),
      render: (id: string) => <p className="uppercase">{id.slice(-8)}</p>,
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Poster</p>,
      dataIndex: "poster",
      key: "poster",
      width: 50,
      render: (poster: string) => (
        <div className="flex items-center justify-center h-16">
          <Image src={poster} className="w-12!" alt="" />
        </div>
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Tên phim</p>,
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (name: string, record: IMovie) => (
        <div>
          <TextNowWrap text={`${name}`} />
          <div className="flex items-center">
            <Tag className="mt-1!">Thời gian: {record.duration} Phút</Tag>
            {record.isFeatured && <Tag>Nổi bật</Tag>}
          </div>
        </div>
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Thể loại</p>,
      dataIndex: "category",
      key: "category",
      width: 150,
      render: (category: string[]) => (
        <TextNowWrap text={category.join(", ")} />
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Độ tuổi</p>,
      dataIndex: "ageRequire",
      key: "ageRequire",
      width: 30,
      render: (ageRequire: string) => {
        const { label, description, text } = getAgeBadge(ageRequire);
        return (
          <div className="flex justify-center">
            <Tooltip
              title={`${text}: ${description}`}
              className="cursor-pointer"
            >
              <Tag>{label}</Tag>
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Ngày công chiếu</p>,
      dataIndex: "releaseDate",
      key: "releaseDate",
      width: 100,
      ...getSorterProps("releaseDate"),
      render: (releaseDate: string) => {
        const isReleased = dayjs(releaseDate) < dayjs();
        return (
          <div>
            <TextNowWrap text={dayjs(releaseDate).format("DD/MM/YYYY")} />
            <Tag color={isReleased ? "blue" : "green"} className="mt-1!">
              {isReleased ? "Đã công chiếu" : "Chưa công chiếu"}
            </Tag>
          </div>
        );
      },
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Trạng thái</p>,
      dataIndex: "status",
      key: "status",
      width: 70,
      render: (status: boolean) => (
        <Tag color={status ? "blue" : "red"}>
          {status ? "Hoạt động" : "Đang khoá"}
        </Tag>
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap" }}>Thao tác</p>,
      key: "action",
      width: 80,
      render: (_: any, record: IMovie) => (
        <Space style={{ display: "flex", gap: 12 }}>
          <Tooltip title="Xem chi tiết">
            <Link to={`/admin/movie/${record._id}`}>
              <EyeOutlined style={{ cursor: "pointer", fontSize: 18 }} />
            </Link>
          </Tooltip>
          <Space>
            <Tooltip title="Cập nhật">
              <Link className="mx-1" to={`/admin/movie/update/${record._id}`}>
                <EditOutlined style={{ color: "blue" }} />
              </Link>
            </Tooltip>

            {record.status ? (
              <Popconfirm
                placement="bottomLeft"
                title="Bạn chắc chắn muốn khóa?"
                onConfirm={() => mutate(record._id)}
              >
                <Button
                  type="text"
                  danger
                  icon={<LockOutlined />}
                  size="small"
                />
              </Popconfirm>
            ) : (
              <Button
                type="text"
                icon={<UnlockOutlined />}
                onClick={() => mutate(record._id)}
                size="small"
              />
            )}
          </Space>
        </Space>
      ),
    },
  ];
};
