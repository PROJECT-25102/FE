import { Button, Layout } from "antd";
import { Link, useNavigate } from "react-router";
import { useAuthSelector } from "../../../stores/useAuthStore";
import { menuGroups } from "./_options";
import SideBarItems from "./SideBarItems";
const { Sider } = Layout;

const SideBar = () => {
  const { logout } = useAuthSelector((state) => ({
    logout: state.logout,
  }));
  const nav = useNavigate();
  return (
    <Sider
      width={280}
      style={{
        position: "fixed",
        height: "100dvh",
        overflowY: "auto",
        background: "#121822",
      }}
      className="shadow-md"
    >
      <div>
        <div className="px-6 pt-4 pb-4 border-b border-gray-200">
          <div className="text-lg font-medium flex items-center gap-3">
            <Link
              to={"/"}
              className=" hover:opacity-80 font-bold flex items-center text-sm gap-2 text-white!"
            >
              <img
                src="https://www.freeiconspng.com/thumbs/bee-png/best-free-bee-png-image-5.png"
                className="w-6"
              />
              <p className="m-0 font-semibold">STAR CINEMA MANAGER</p>
            </Link>
          </div>
        </div>
        <div className="mt-8 px-3">
          <ul className="flex flex-col gap-4 font-normal text-base">
            {menuGroups.map((menuItem, index) => (
              <SideBarItems key={index} item={menuItem} />
            ))}
          </ul>
        </div>
      </div>
      <div className="px-6 absolute bottom-8 w-full">
        <Button
          onClick={() => {
            nav("/");
            logout();
          }}
          className="w-full! text-primary!"
          type="dashed"
        >
          Đăng xuất
        </Button>
      </div>
    </Sider>
  );
};

export default SideBar;
