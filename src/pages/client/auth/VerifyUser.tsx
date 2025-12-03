import { useEffect, useState } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router";
import { Button } from "antd";
import { useAuthSelector } from "../../../common/stores/useAuthStore";

const VerifyUser = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const [loading, setLoading] = useState(true);
  const setOpen = useAuthSelector((state) => state.setOpenModal);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#10141b] flex flex-col justify-center items-center min-h-screen text-white">
      {loading ? (
        <div className="w-20 h-20 border-8 border-gray-700 border-t-primary rounded-full animate-spin"></div>
      ) : status === "success" ? (
        <div className="flex flex-col items-center gap-4 animate-fadeIn text-center">
          <CheckCircleOutlined className="text-[#22c55e]! text-6xl" />
          <p className="text-lg font-medium text-gray-200">
            Xác thực tài khoản thành công!
          </p>
          <Link
            to="/?loginModal=true"
            onClick={() => setOpen(true)}
            className="hover:opacity-75! hover:text-white! text-white!"
          >
            <Button
              style={{
                background: `var(--color-primary)`,
                height: 45,
                borderRadius: `calc(infinity * 1px)`,
                width: "100%",
                border: "none",
              }}
              className="hover:text-white! text-white! w-xs!"
            >
              Đăng nhập
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 animate-fadeIn">
          <CloseCircleOutlined className="text-primary! text-6xl" />
          <p className="text-lg font-medium text-gray-200">
            Xác thực thất bại hoặc link không hợp lệ.
          </p>
        </div>
      )}
    </div>
  );
};

export default VerifyUser;
