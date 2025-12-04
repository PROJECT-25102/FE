import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useMessage } from "../../../common/hooks/useMessage";
import { updateProfile } from "../../../common/services/user.service";
import { useAuthSelector } from "../../../common/stores/useAuthStore";
import type { IPayloadUpdateUser } from "../../../common/types/user";
import { formRules } from "../../../common/utils/formRules";
import { uploadImage } from "../../../common/utils/upload";
import UploadImage from "../../../components/UploadImage";
import ChangePasswordModal from "./components/ChangePasswordModal";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const user = useAuthSelector((state) => state.user);
  const { token, login } = useAuthSelector((state) => ({
    login: state.login,
    token: state.token,
  }));
  const { antdMessage, HandleError } = useMessage();
  const { mutateAsync } = useMutation({
    mutationFn: (payload: IPayloadUpdateUser) => updateProfile(payload),
    onSuccess: ({ data, message }) => {
      antdMessage.success(message);
      login(data, token as string);
      setLoading(false);
    },
    onError: (err) => {
      HandleError(err);
      setLoading(false);
    },
  });
  const onFinish = async (values: any) => {
    setLoading(true);
    if (values.avatar[0]) {
      const url = await uploadImage(values.avatar[0].originFileObj);
      values.avatar = url;
    }
    await mutateAsync(values);
  };
  return (
    <div className="mt-12 max-w-4xl xl:mx-auto mx-6">
      <Form
        onFinish={onFinish}
        initialValues={{
          avatar: user?.avatar,
          userName: user?.userName,
          email: user?.email,
          phone: user?.phone,
        }}
        layout="vertical"
      >
        <Form.Item
          label="Ảnh đại diện"
          required
          name={"avatar"}
          rules={[formRules.required("Ảnh đại diện", "choose")]}
        >
          <UploadImage width={100} height={100} />
        </Form.Item>
        <Form.Item
          label="Họ và tên"
          name={"userName"}
          rules={[formRules.required("Họ và tên")]}
        >
          <Input style={{ height: 45 }} placeholder="Nhập họ tên của bạn" />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name={"phone"}
          rules={[formRules.required("Số điện thoại")]}
        >
          <Input style={{ height: 45 }} placeholder="Nhập họ tên của bạn" />
        </Form.Item>
        <Form.Item
          label="email"
          name={"email"}
          rules={[formRules.required("Email")]}
        >
          <Input
            disabled
            style={{ height: 45 }}
            placeholder="Nhập họ tên của bạn"
          />
        </Form.Item>
        <Form.Item>
          <div className="flex items-center gap-4 justify-end">
            <ChangePasswordModal>
              <Button disabled={loading} style={{ height: 40 }}>
                Đổi mật khẩu
              </Button>
            </ChangePasswordModal>
            <Button
              loading={loading}
              htmlType="submit"
              type="primary"
              style={{ height: 40 }}
            >
              Lưu thông tin
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
