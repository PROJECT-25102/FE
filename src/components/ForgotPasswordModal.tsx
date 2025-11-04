import { Button, Form, Input, Modal } from "antd";
import type { ReactElement } from "react";
import React, { useState } from "react";
import { useMessage } from "../common/hooks/useMessage";
import { resetPasswordApi } from "../common/services/auth.service";
import { formRules } from "../common/utils/formRules";

const ForgotPasswordModal = ({
  children,
  onSwitch,
}: {
  children: ReactElement;
  onSwitch?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { antdMessage } = useMessage();
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const { message } = await resetPasswordApi(values);
      antdMessage.success(message);
      setLoading(false);
      setOpen(false);
    } catch (error) {
      form.setFields([
        {
          name: "email",
          errors: [
            `${(error as any).response.data.message || "Có lỗi xảy ra"} `,
          ],
        },
      ]);
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
          background: `hsl(222.2 84% 4.9%)`,
        }}
        title={
          <p className="text-lg font-semibold text-white/90 tracking-wide">
            Quên mật khẩu
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
          <div className="pt-4!">
            <Form.Item>
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
                Xác nhận
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ForgotPasswordModal;
