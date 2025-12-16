import {
  CalendarOutlined,
  VideoCameraOutlined,
  DesktopOutlined,
  LineChartOutlined,
  TeamOutlined,
  TagOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import type { JSX } from "react";

export type IChildrenItem = {
  label: string;
  route: string;
};

export type IMenuItem = {
  icon: JSX.Element;
  label: string;
  route?: string;
  children?: IChildrenItem[];
};

export const menuGroups: IMenuItem[] = [
  {
    icon: <LineChartOutlined />,
    label: "Thống kê",
    route: "/admin",
    children: [
      { label: "Thống kê vé", route: "/admin/ticket-stats" },
      { label: "Thống kê doah thu", route: "/admin/revenue" },
    ],
  },
  {
    icon: <ContainerOutlined />,
    label: "Quản lý vé",
    route: "/admin/ticket",
  },
  {
    icon: <VideoCameraOutlined />,
    label: "Quản lý phim",
    route: "/admin/movie",
    children: [
      { label: "Tạo mới phim", route: "/admin/movie/create" },
      { label: "Tất cả phim", route: "/admin/movie" },
    ],
  },
  {
    icon: <TagOutlined />,
    label: "Quản lý thể loại",
    route: "/admin/category",
    children: [
      { label: "Tạo mới thể loại", route: "/admin/category/create" },
      { label: "Tất cả thể loại", route: "/admin/category" },
    ],
  },
  {
    icon: <DesktopOutlined />,
    label: "Quản lý phòng chiếu",
    route: "/admin/room",
    children: [
      { label: "Tạo mới phòng chiếu", route: "/admin/room/create" },
      { label: "Tất cả phòng chiếu", route: "/admin/room" },
    ],
  },
  {
    icon: <CalendarOutlined />,
    label: "Quản lý lịch chiếu",
    route: "/admin/showtime",
    children: [
      { label: "Tạo lịch chiếu", route: "/admin/showtime/create" },
      { label: "Tất cả lịch chiếu", route: "/admin/showtime" },
    ],
  },
  {
    icon: <TeamOutlined />,
    label: "Quản lý người dùng",
    route: "/admin/user",
  },
];
