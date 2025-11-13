import {
  EditOutlined,
  InsertRowAboveOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Space, Tag, Tooltip } from "antd";
import { Link } from "react-router";
import type { IRoom } from "../../../../common/types/room";
import TextNowWrap from "../../../../components/TextNowWrap";
import dayjs from "dayjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatusRoom } from "../../../../common/services/room.service";
import { useMessage } from "../../../../common/hooks/useMessage";
import { QUERYKEY } from "../../../../common/constants/queryKey";

export const columnRoom = (getSorterProps: (field: keyof IRoom) => object) => {
  const { antdMessage, HandleError } = useMessage();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => updateStatusRoom(id),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes(QUERYKEY.ROOM),
      });
    },
    onError: (err) => HandleError(err),
  });
  return [
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Mã phòng</p>,
      dataIndex: "_id",
      key: "_id",
      width: 30,
      ...getSorterProps("_id"),
      render: (id: string) => <p className="uppercase">{id.slice(-8)}</p>,
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Tên phòng</p>,
      dataIndex: "name",
      key: "name",
      width: 100,
      render: (name: string) => <TextNowWrap text={`${name}`} />,
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Mô tả</p>,
      dataIndex: "description",
      key: "descriptionm",
      width: 150,
      render: (description: string) => (
        <TextNowWrap text={description || "Chưa cập nhật"} />
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Số lượng ghế</p>,
      dataIndex: "capacity",
      key: "capacity",
      width: 150,
      render: (capacity: string) => (
        <TextNowWrap text={capacity || "Chưa cập nhật"} />
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
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Thời gian tạo</p>,
      dataIndex: "createdAt",
      key: "createdAt",
      width: 70,
      render: (createdAt: string) => (
        <TextNowWrap text={dayjs(createdAt).format("YYYY-MM-DD | HH:mm")} />
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap" }}>Thao tác</p>,
      key: "action",
      width: 80,
      render: (_: any, record: IRoom) => (
        <Space style={{ display: "flex", gap: 12 }}>
          <Tooltip title="Ghế ngồi">
            <Link to={`/admin/room/seat/${record._id}`}>
              <InsertRowAboveOutlined
                style={{ cursor: "pointer", fontSize: 18 }}
              />
            </Link>
          </Tooltip>
          <Space>
            <Tooltip title="Cập nhật">
              <Link className="mx-1" to={`/admin/room/update/${record._id}`}>
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
                  loading={isPending}
                  type="text"
                  danger
                  icon={<LockOutlined />}
                  size="small"
                />
              </Popconfirm>
            ) : (
              <Button
                type="text"
                loading={isPending}
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
