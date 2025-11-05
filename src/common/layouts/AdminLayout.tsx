import { ConfigProvider, Layout, theme } from "antd";
import { Outlet } from "react-router";
import SideBar from "./components/sideBar/SideBar";

const { Content } = Layout;

const AdminLayout = () => {
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
        <Layout style={{ minHeight: "100dvh" }}>
          <SideBar />
          <Layout style={{ marginLeft: 280 }}>
            <Content
              style={{
                padding: 24,
                background: "#10141b",
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
};

export default AdminLayout;
