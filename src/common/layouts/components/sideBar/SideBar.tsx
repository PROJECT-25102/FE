import { Layout } from "antd";
import { Link } from "react-router";
import { menuGroups } from "./_options";
import SideBarItems from "./SideBarItems";
const { Sider } = Layout;

const SideBar = () => {
  return (
    <Sider
      width={280}
      style={{
        position: "fixed",
        height: "100dvh",
        padding: "24px 0px 24px 16px",
        background: `#10141b`,
      }}
    >
      <div className="shadow-md  w-full h-full bg-[#121822] rounded-md">
        <div className="px-6 pt-4 pb-4 border-b border-gray-200/30">
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
    </Sider>
  );
};

export default SideBar;
