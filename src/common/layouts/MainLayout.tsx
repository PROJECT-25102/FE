import { ConfigProvider, theme } from "antd";
import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";

const MainLayout = () => {
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
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </ConfigProvider>
    </div>
  );
};

export default MainLayout;
