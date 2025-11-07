import {
  HomeOutlined,
  LeftOutlined,
  LogoutOutlined,
  ReloadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  App,
  Avatar,
  Button,
  ConfigProvider,
  Dropdown,
  Layout,
  theme,
  type MenuProps,
} from "antd";
import { Link, Outlet, useNavigate } from "react-router";
import { useAuthSelector } from "../stores/useAuthStore";
import SideBar from "./components/sideBar/SideBar";

const { Content } = Layout;

const AdminLayout = () => {
  const { user, logout } = useAuthSelector((state) => ({
    user: state.user,
    logout: state.logout,
  }));
  const nav = useNavigate();
  const items: MenuProps["items"] = [
    {
      label: <Link to={"/profile"}>Thông tin</Link>,
      icon: <UserOutlined />,
      key: "1",
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
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div className="bg-[#10141b] min-h-screen text-white">
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorBgContainer: "#10141b",
            colorPrimary: "#ef4444",
          },
          components: {
            Modal: {
              contentBg: "transparent",
              headerBg: "transparent",
              footerBg: "transparent",
            },
          },
        }}
      >
        <App>
          <Layout style={{ minHeight: "100dvh" }}>
            <SideBar />
            <Layout style={{ marginLeft: 280 }}>
              <Content
                style={{
                  padding: 24,
                  background: "#10141b",
                }}
              >
                <div className="bg-[#121822] w-full  rounded-md shadow-md px-6 py-3 mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Link to="/admin">
                      <Button icon={<HomeOutlined />} />
                    </Link>
                    <Button onClick={() => nav(-1)} icon={<LeftOutlined />} />
                    <Button onClick={handleReload} icon={<ReloadOutlined />} />
                  </div>
                  <div>
                    <Dropdown menu={{ items }}>
                      <Link
                        to={"/profile"}
                        className=" flex items-center gap-3 font-medium cursor-pointer hover:opacity-85 duration-300  px-6  rounded-full text-white!"
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
                  </div>
                </div>
                <Outlet />
              </Content>
            </Layout>
          </Layout>
        </App>
      </ConfigProvider>
    </div>
  );
};

export default AdminLayout;
