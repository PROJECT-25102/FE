import {
  DashboardOutlined,
  FileSearchOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, type MenuProps } from "antd";
import { Link, useNavigate } from "react-router";
import type { IUser } from "../../types/user";
import { useAuthSelector } from "../../stores/useAuthStore";

const UserToolBar = ({ user }: { user: IUser }) => {
  const logout = useAuthSelector((state) => state.logout);
  const nav = useNavigate();
  const items: MenuProps["items"] = [
    ...(user?.role === "admin"
      ? [
          {
            label: <Link to={"/admin"}>Quản trị</Link>,
            icon: <DashboardOutlined />,
            key: "0",
          },
        ]
      : []),
    {
      label: <Link to={"/profile"}>Thông tin</Link>,
      icon: <UserOutlined />,
      key: "1",
    },
    {
      label: <Link to={"/profile/ticket"}>Vé của tôi</Link>,
      icon: <FileSearchOutlined />,
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: "Đăng xuất",
      key: "3",
      icon: <LogoutOutlined className="rotate-180" />,
      onClick: () => {
        logout();
        nav("/");
      },
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <Link
        to={"/profile"}
        className=" flex items-center gap-3 font-medium cursor-pointer hover:opacity-85 duration-300 py-3 px-6  rounded-full text-white!"
      >
        <Avatar src={user?.avatar} size="default" />
        <div className="flex flex-col">
          <p>Xin chào</p>
          <p className="whitespace-nowrap text-ellipsis max-w-[120px] overflow-hidden">
            {user?.userName}
          </p>
        </div>
      </Link>
    </Dropdown>
  );
};

export default UserToolBar;
