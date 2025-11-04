import { Navigate, useNavigate, useParams } from "react-router";
import { useAuthStore } from "../../../common/stores/useAuthStore";
import { useEffect } from "react";
import { getProfile } from "../../../common/services/user.service";

const LoginGoogle = () => {
  const { token } = useParams();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  login(null, token as string);
  useEffect(() => {
    (async () => {
      if (token) {
        try {
          const { data } = await getProfile();
          console.log(data);
          if (data) {
            login(data, token as string);
            navigate("/", { replace: true });
          }
        } catch (error) {
          console.log(error);
          navigate("/auth/login?error='Có lỗi xảy ra'", { replace: true });
        }
      }
    })();
  }, [login, navigate, token]);
  if (token && token?.length < 5) return <Navigate to="/" />;
  return (
    <div className="bg-[#10141b] flex justify-center items-center min-h-screen">
      <div className="w-24 h-24 border-8 border-gray-700 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default LoginGoogle;
