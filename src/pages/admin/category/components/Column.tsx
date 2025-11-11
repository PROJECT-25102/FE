import { EditOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Popconfirm, Space, Tag, Tooltip } from "antd";
import { Link } from "react-router";
import { QUERYKEY } from "../../../../common/constants/queryKey";
import { useMessage } from "../../../../common/hooks/useMessage";
import { updateStatusCategory } from "../../../../common/services/category.service";
import type { ICategory } from "../../../../common/types/category";
import TextNowWrap from "../../../../components/TextNowWrap";

export const columnCategory = (
  getSorterProps: (field: keyof ICategory) => object,
) => {
  const queryClient = useQueryClient();
  const { antdMessage, HandleError } = useMessage();
  const { mutate } = useMutation({
    mutationFn: (id: string) => updateStatusCategory(id),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(QUERYKEY.CATEGORY),
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
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Tên thể loại</p>,
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (name: string) => <TextNowWrap text={`${name}`} />,
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Mô tả thể loại</p>,
      dataIndex: "description",
      key: "description",
      width: 150,
      render: (description: string) => (
        <TextNowWrap text={`${description || "Chưa cập nhật"}`} />
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Phim</p>,
      dataIndex: "movieCount",
      key: "movieCount",
      width: 150,
      render: (movieCount: string, record: ICategory) =>
        record.status ? (
          <div className="flex gap-2">
            <p>{movieCount}</p>
            <Link to={`/admin/movie?category=${record._id}`}>Xem tất cả</Link>
          </div>
        ) : (
          <Tag>Không khả dụng</Tag>
        ),
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
      render: (_: any, record: ICategory) => (
        <Space style={{ display: "flex", gap: 12 }}>
          <Space>
            <Tooltip title="Cập nhật">
              <Link
                className="mx-1"
                to={`/admin/category/update/${record._id}`}
              >
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
