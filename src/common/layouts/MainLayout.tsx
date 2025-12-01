import { App, ConfigProvider, theme } from "antd";
import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useAuthSelector } from "../stores/useAuthStore";
import { useEffect } from "react";
import { initSocket } from "../../socket/socket-client";

const MainLayout = () => {
  const token = useAuthSelector((state) => state.token);

  useEffect(() => {
    if (token) initSocket(token as string);
  }, [token]);
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
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </App>
      </ConfigProvider>
    </div>
  );
};

export default MainLayout;
