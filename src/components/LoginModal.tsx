import { Button, Form, Input, Modal } from "antd";
import type { ReactElement } from "react";
import React, { useState } from "react";
import type { IRegisterPayload } from "../common/types/auth";
import { formRules } from "../common/utils/formRules";
import RegisterModal from "./RegisterModal";

const LoginModal = ({
  children,
  onSwitch,
}: {
  children: ReactElement;
  onSwitch?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const handleSubmit = (
    values: Omit<IRegisterPayload, "userName" | "phone" | "confirmPassword">,
  ) => {
    console.log(values);
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
        afterClose={() => form.resetFields()}
        open={open}
        width={600}
        className="rounded-xl border border-white/10  backdrop-blur-md"
        style={{
          background: `hsl(222.2 84% 4.9%)`,
        }}
        title={
          <p className="text-lg font-semibold text-white/90 tracking-wide">
            Đăng nhập
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
          <div className="flex justify-end">
            <span className="text-primary">Quên mật khẩu</span>
          </div>
          <Form.Item className="mt-4!">
            <Button
              htmlType="submit"
              style={{
                background: `var(--color-primary)`,
                height: 45,
                borderRadius: `calc(infinity * 1px)`,
                width: "100%",
              }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
          <p className="text-center">
            Bạn đã chưa tài khoản?{" "}
            <RegisterModal onSwitch={() => setOpen(false)}>
              <span className="text-primary cursor-pointer hover:underline">
                Đăng ký
              </span>
            </RegisterModal>
          </p>
        </Form>
      </Modal>
    </>
  );
};

export default LoginModal;
