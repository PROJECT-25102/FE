import { Button, Form, Input, Modal } from "antd";
import type { ReactElement } from "react";
import React, { useState } from "react";
import { useMessage } from "../common/hooks/useMessage";
import { registerApi } from "../common/services/auth.service";
import { formRules } from "../common/utils/formRules";
import LoginModal from "./LoginModal";

const RegisterModal = ({
  children,
  onSwitch,
}: {
  children: ReactElement;
  onSwitch?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { antdMessage, HandleError } = useMessage();
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const { confirmPassword, firstName, lastName, ...payload } = values;
    void confirmPassword;
    try {
      const { message } = await registerApi({
        userName: `${firstName} ${lastName}`,
        ...payload,
      });
      antdMessage.success(message);
      setLoading(false);
      setOpen(false);
    } catch (error) {
      HandleError(error);
      setLoading(false);
    }
  };
  return (
    <>
      {React.cloneElement(children, {
        onClick: () => {
          if (onSwitch) onSwitch();
          setOpen(true);
        },
      } as { onClick: () => void })}
      <Modal
        onCancel={() => setOpen(false)}
        open={open}
        afterClose={() => form.resetFields()}
        width={600}
        className="rounded-xl border border-white/10  backdrop-blur-md"
        style={{
          top: 30,
          background: `hsl(222.2 84% 4.9%)`,
        }}
        title={
          <p className="text-lg font-semibold text-white/90 tracking-wide">
            Đăng ký
          </p>
        }
        footer={null}
      >
        <Form
          onFinish={handleSubmit}
          form={form}
          layout="vertical"
          className="my-6!"
        >
          <div className="flex items-center gap-4">
            <Form.Item
              label={<p className="text-base font-medium">Họ</p>}
              className="flex-1"
              name={"firstName"}
              required
              rules={[
                formRules.required("Họ"),
                formRules.textRange("Họ", 2, 25),
              ]}
            >
              <Input
                className="bg-transparent! text-white! placeholder:text-white/50! border-white/10!"
                style={{ height: 60, boxShadow: "none" }}
                placeholder="Tên"
              />
            </Form.Item>
            <Form.Item
              label={<p className="text-base font-medium">Tên</p>}
              className="flex-1"
              name={"lastName"}
              required
              rules={[
                formRules.required("Tên"),
                formRules.textRange("Tên", 2, 25),
              ]}
            >
              <Input
                className="bg-transparent! text-white placeholder:text-white/50! border-white/10!"
                style={{ height: 60, boxShadow: "none" }}
                placeholder="Tên"
              />
            </Form.Item>
          </div>
          <Form.Item
            label={<p className="text-base font-medium">Email</p>}
            className="flex-1"
            name={"email"}
            required
            rules={[
              formRules.required("email"),
              { type: "email", message: "Vui lòng nhập đúng định dạng email!" },
            ]}
          >
            <Input
              className="bg-transparent! text-white placeholder:text-white/50! border-white/10!"
              style={{ height: 60, boxShadow: "none" }}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            label={<p className="text-base font-medium">Số điện thoại</p>}
            className="flex-1"
            name={"phone"}
            required
            rules={[
              formRules.required("số điện thoại"),
              {
                pattern: /^(0|\+84)(\d{9})$/,
                message: "Vui lòng nhập số điện thoại hợp lệ!",
              },
            ]}
          >
            <Input
              className="bg-transparent! text-white placeholder:text-white/50! border-white/10!"
              style={{ height: 60, boxShadow: "none" }}
              placeholder="Số điện thoại"
            />
          </Form.Item>
          <div className="flex items-center gap-6">
            <Form.Item
              label={<p className="text-base font-medium">Mật khẩu</p>}
              className="flex-1"
              name={"password"}
              required
              hasFeedback
              rules={[formRules.required("Mật khẩu")]}
            >
              <Input.Password
                className="bg-transparent! text-white placeholder:text-white/50! border-white/10!"
                style={{ height: 60, boxShadow: "none" }}
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item
              label={<p className="text-base font-medium">Xác nhận mật khẩu</p>}
              className="flex-1"
              name={"confirmPassword"}
              required
              rules={[
                formRules.required("Xác nhận mật khẩu"),
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không khớp!"),
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                className="bg-transparent! text-white placeholder:text-white/50! border-white/10!"
                style={{ height: 60, boxShadow: "none" }}
                placeholder="Xác nhận mật khẩu"
              />
            </Form.Item>
          </div>
          <Form.Item className="mt-4!">
            <Button
              loading={isLoading}
              htmlType="submit"
              style={{
                background: `var(--color-primary)`,
                height: 45,
                borderRadius: `calc(infinity * 1px)`,
                width: "100%",
              }}
            >
              Đăng ký
            </Button>
          </Form.Item>
          <p className="text-center">
            Bạn đã có tài khoản?{" "}
            <LoginModal onSwitch={() => setOpen(false)}>
              <span className="text-primary cursor-pointer hover:underline">
                Đăng nhập
              </span>
            </LoginModal>
          </p>
        </Form>
      </Modal>
    </>
  );
};

export default RegisterModal;
