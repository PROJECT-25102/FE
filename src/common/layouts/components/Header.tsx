import { BellOutlined, HeartFilled } from "@ant-design/icons";
import { Badge } from "antd";
import { Link, NavLink } from "react-router";
import LoginModal from "../../../components/LoginModal";
import RegisterModal from "../../../components/RegisterModal";
import { useAuthSelector } from "../../stores/useAuthStore";
import UserToolBar from "./UserToolBar";

const Header = () => {
  const user = useAuthSelector((state) => state.user);
  const navItems = [
    {
      path: "/",
      label: "Trang chủ",
    },
    {
      path: "/movie",
      label: "Lịch chiếu",
    },
    {
      path: "/news",
      label: "Tin tức",
    },
    {
      path: "/discount",
      label: "Khuyến mãi",
    },
    {
      path: "/ticket",
      label: "Giá vé",
    },
    {
      path: "/about",
      label: "Giới thiệu",
    },
  ];
  return (
    <header>
      <div className="max-w-7xl xl:mx-auto mx-6 h-20 flex items-center justify-between">
        <Link to={"/"} className="flex items-end gap-1">
          <img
            src="https://www.freeiconspng.com/thumbs/bee-png/best-free-bee-png-image-5.png"
            className="w-16"
          />
          <p className="m-0 font-semibold text-white">
            STAR <br /> CINEMA
          </p>
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${isActive ? "text-primary!" : "text-white!"} text-base  hover:text-primary! duration-300`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {user ? (
            <div className="min-w-[320px] flex justify-end items-center">
              <div className="flex items-center gap-4">
                <HeartFilled className="text-xl" />
                <Badge count={0} showZero overflowCount={10}>
                  <BellOutlined className="text-xl" />
                </Badge>
              </div>
              <UserToolBar user={user} />
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <RegisterModal>
                <button className="border cursor-pointer hover:bg-blue-300/30 duration-300 hover:scale-105 border-white h-11 px-10 rounded-full font-medium text-base">
                  Đăng ký
                </button>
              </RegisterModal>
              <LoginModal>
                <button className="bg-primary cursor-pointer  h-11 px-10 rounded-full font-medium text-base duration-300 hover:scale-105">
                  Đăng nhập
                </button>
              </LoginModal>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
