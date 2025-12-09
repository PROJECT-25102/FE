import { Button, Image, Modal, Tag } from "antd";
import React, { useState, type ReactElement } from "react";
import type { IUser } from "../../../../common/types/user";
import { ROLE_COLOR, ROLE_LABEL } from "../../../../common/constants/user";
import dayjs from "dayjs";

const ModalDetailUser = ({
  children,
  user,
}: {
  children: ReactElement;
  user: IUser;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {React.cloneElement(children, {
        onClick: () => setOpen(true),
      } as { onClick: () => void })}

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        className="rounded-xl border border-white/10 backdrop-blur-md"
        style={{ background: `hsl(222.2 84% 4.9%)` }}
        title="Chi tiết người dùng"
        footer={<Button onClick={() => setOpen(false)}>Đóng</Button>}
      >
        <div className="min-h-[30vh] grid grid-cols-2 gap-6 mt-8">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-white/70">Ảnh đại diện</p>
            <Image
              src={user.avatar}
              className="w-24! h-24! rounded-full! object-cover!"
            />
            <Tag color={ROLE_COLOR[user.role]} className="m-0!">
              {ROLE_LABEL[user.role]}
            </Tag>
          </div>
          <div className="space-y-3 text-white/80">
            <div className="flex flex-col gap-1">
              <span className="text-white/50">Tên người dùng:</span>{" "}
              <p>{user.userName}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/50">Email:</span>
              <p>{user.email}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/50">Số điện thoại:</span>
              <p>{user.phone || "Chưa cập nhật"}</p>
            </div>
            <div>
              <span className="text-white/50">Ngày đăng ký:</span>
              <p>{dayjs(user.createdAt).format("YYYY-MM-DD | HH:mm")}</p>
            </div>
            <p>
              <span className="text-white/50">Trạng thái:</span>{" "}
              <Tag color={user.banned?.isBanned ? "volcano" : "green"}>
                {user.banned?.isBanned ? "Đã khóa" : "Đang hoạt động"}
              </Tag>
            </p>
            <p>
              <span className="text-white/50">Kích hoạt email:</span>{" "}
              <Tag color={user.isVerified ? "blue" : "default"}>
                {user.isVerified ? "Đã kích hoạt" : "Chưa kích hoạt"}
              </Tag>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalDetailUser;
