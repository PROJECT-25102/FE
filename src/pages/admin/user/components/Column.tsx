import {
  EditOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Tag, Tooltip } from "antd";
import { ROLE_COLOR, ROLE_LABEL } from "../../../../common/constants/user";
import type { IBannerUser, IUser } from "../../../../common/types/user";
import TextNowWrap from "../../../../components/TextNowWrap";
import ModalDetailUser from "./ModalDetailUser";
import ModalUpdateUser from "./ModalUpdateUser";
import { useAuthSelector } from "../../../../common/stores/useAuthStore";
import ModalBlockUser from "./ModalBlockUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMessage } from "../../../../common/hooks/useMessage";
import { bannedUser } from "../../../../common/services/user.service";
import { QUERYKEY } from "../../../../common/constants/queryKey";
import dayjs from "dayjs";

export const columnUser = (getSorterProps: (field: keyof IUser) => object) => {
  const userId = useAuthSelector((state) => state.user?._id);
  const queryClient = useQueryClient();
  const { antdMessage, HandleError } = useMessage();
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      userId,
      ...payload
    }: {
      userId: string;
      isBanned: boolean;
      description: string;
      bannedAt: string;
    }) => bannedUser(userId, payload),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(QUERYKEY.USER),
      });
    },
    onError: (err) => HandleError(err),
  });
  return [
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Mã</p>,
      dataIndex: "_id",
      key: "_id",
      width: 30,
      ...getSorterProps("_id"),
      render: (id: string) => <p className="uppercase">{id.slice(-8)}</p>,
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Họ và tên</p>,
      dataIndex: "userName",
      key: "userName",
      width: 159,
      ...getSorterProps("userName"),
      render: (name: string) => <TextNowWrap text={`${name}`} />,
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Email</p>,
      dataIndex: "email",
      key: "email",
      width: 150,
      render: (email: string) => (
        <TextNowWrap text={email || "Chưa cập nhật"} />
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Số điện thoại</p>,
      dataIndex: "phone",
      key: "phone",
      width: 150,
      render: (phone: string) => (
        <TextNowWrap text={phone || "Chưa cập nhật"} />
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Vai trò</p>,
      dataIndex: "role",
      key: "role",
      width: 70,
      render: (role: string) => (
        <Tag color={ROLE_COLOR[role]}>{ROLE_LABEL[role]}</Tag>
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Kích hoạt</p>,
      dataIndex: "isVerified",
      key: "isVerified",
      width: 100,
      render: (isVerified: boolean) => (
        <p className="whitespace-nowrap">
          {isVerified ? "Đã kích hoạt" : "Chưa kích hoạt"}
        </p>
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Trạng thái</p>,
      dataIndex: "banned",
      key: "banned",
      width: 70,
      render: (banned: IBannerUser) => (
        <>
          <Tag color={banned.isBanned ? "#ff4d4f" : "#1890ff"}>
            {banned.isBanned ? "Đã khoá" : "Hoạt động"}
          </Tag>
        </>
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Thao tác</p>,
      dataIndex: "_id",
      key: "_id",
      width: 70,
      render: (id: string, user: IUser) => (
        <div className="flex items-centaaer gap-4">
          <ModalDetailUser user={user}>
            <Tooltip title="Chi tiết người dùng">
              <Button icon={<EyeOutlined />} type="text" />
            </Tooltip>
          </ModalDetailUser>
          <ModalUpdateUser user={user}>
            <Tooltip
              title={
                id === userId
                  ? "Bạn không thể cập nhật chính bản thân bạn"
                  : "Cập nhật người dùng"
              }
            >
              <Button
                disabled={id === userId}
                icon={<EditOutlined />}
                type="text"
              />
            </Tooltip>
          </ModalUpdateUser>
          {user.banned.isBanned ? (
            <Tooltip
              title={
                id === userId
                  ? "Bạn không thể khoá chính bạn"
                  : "Mở khoá người dùng"
              }
            >
              <Popconfirm
                title="Mở khoá người dùng"
                onConfirm={() =>
                  mutate({
                    userId: user._id,
                    isBanned: false,
                    description: "",
                    bannedAt: dayjs().format(),
                  })
                }
              >
                <Button
                  disabled={id === userId}
                  loading={isPending}
                  icon={<UnlockOutlined />}
                  type="text"
                />
              </Popconfirm>
            </Tooltip>
          ) : (
            <ModalBlockUser user={user}>
              <Tooltip
                title={
                  id === userId
                    ? "Bạn không thể khoá chính bạn"
                    : "Khoá người dùng"
                }
              >
                <Button
                  disabled={id === userId}
                  loading={isPending}
                  icon={<LockOutlined />}
                  danger
                  type="text"
                />
              </Tooltip>
            </ModalBlockUser>
          )}
        </div>
      ),
    },
  ];
};
