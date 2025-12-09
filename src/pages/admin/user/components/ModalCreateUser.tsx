import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState, type ReactElement } from "react";
import { QUERYKEY } from "../../../../common/constants/queryKey";
import { ROLE, ROLE_LABEL } from "../../../../common/constants/user";
import { useMessage } from "../../../../common/hooks/useMessage";
import { createUser } from "../../../../common/services/user.service";
import type { CreateUserPayload } from "../../../../common/types/user";
import { formRules } from "../../../../common/utils/formRules";

const ModalCreateUser = ({ children }: { children: ReactElement }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { antdMessage, HandleError } = useMessage();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: CreateUserPayload) => createUser(payload),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes(QUERYKEY.USER),
      });
      setOpen(false);
    },
    onError: (err) => HandleError(err),
  });
  const handleSubmit = async () => {
    const values = await form.validateFields();
    const payload: CreateUserPayload = {
      userName: values.firstName + " " + values.lastName,
      ...values,
    };
    mutate(payload);
  };
  return (
    <>
      {React.cloneElement(children, {
        onClick: () => setOpen(true),
      } as { onClick: () => void })}
      <Modal
        open={open}
        afterOpenChange={() => form.resetFields()}
        onCancel={() => setOpen(false)}
        className="rounded-xl border border-white/10 backdrop-blur-md"
        style={{ background: `hsl(222.2 84% 4.9%)` }}
        title="Thêm mới người dùng"
        footer={
          <div className="flex items-center justify-end gap-4">
            <Button disabled={isPending}>Đóng</Button>
            <Button
              onClick={handleSubmit}
              loading={isPending}
              disabled={isPending}
              type="primary"
            >
              Tạo mới
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical">
          <div className="flex items-center gap-6">
            <Form.Item
              label={"Họ"}
              className="flex-1"
              name={"firstName"}
              required
              rules={[
                formRules.required("Họ"),
                formRules.textRange("Họ", 2, 25),
              ]}
            >
              <Input placeholder="Nhập họ người dùng" />
            </Form.Item>
            <Form.Item
              label={"Tên"}
              className="flex-1"
              name={"lastName"}
              required
              rules={[
                formRules.required("Tên"),
                formRules.textRange("Tên", 2, 25),
              ]}
            >
              <Input placeholder="Nhập tên người dùng" />
            </Form.Item>
          </div>
          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              formRules.required("Email"),
              { type: "email", message: "Vui lòng nhập đúng định dạng email!" },
            ]}
          >
            <Input placeholder="Nhập email người dùng" />
          </Form.Item>
          <Form.Item
            name={"phone"}
            label="Số điện thoại"
            rules={[formRules.required("Số điện thoại")]}
          >
            <Input placeholder="Nhập số điện thoại người dùng" />
          </Form.Item>
          <Form.Item
            name={"role"}
            label="Lựa chọn vai trò"
            rules={[formRules.required("Vai trò", "choose")]}
          >
            <Select
              placeholder="Vai trò của người dùng"
              options={[
                ...Object.entries(ROLE).map((value) => ({
                  value: value[1],
                  label: ROLE_LABEL[value[1]],
                })),
              ]}
            />
          </Form.Item>
          <p className="bg-red-500/20 py-2 px-4 rounded-lg border border-red-500">
            Lưu ý: Sau khi người dùng xác nhận kích hoạt tài khoản thành công
            mật khẩu mặc định sẽ là beestar@123
          </p>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
