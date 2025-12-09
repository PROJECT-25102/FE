import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React, { useState, type ReactElement } from "react";
import { QUERYKEY } from "../../../../common/constants/queryKey";
import { useMessage } from "../../../../common/hooks/useMessage";
import { bannedUser } from "../../../../common/services/user.service";
import type { IUser } from "../../../../common/types/user";
import { formRules } from "../../../../common/utils/formRules";

const ModalBlockUser = ({
  children,
  user,
}: {
  children: ReactElement;
  user: IUser;
}) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { antdMessage, HandleError } = useMessage();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: {
      isBanned: boolean;
      description: string;
      bannedAt: string;
    }) => bannedUser(user._id, payload),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(QUERYKEY.USER),
      });
      setOpen(false);
    },
    onError: (err) => HandleError(err),
  });
  const handleSubmit = async () => {
    const values = await form.validateFields();
    mutate({
      isBanned: true,
      description: values.description,
      bannedAt: dayjs().format(),
    });
  };
  return (
    <>
      {React.cloneElement(children, {
        onClick: () => setOpen(true),
      } as { onClick: () => void })}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        className="rounded-xl border border-white/10 backdrop-blur-md"
        style={{ background: `hsl(222.2 84% 4.9%)` }}
        title="Khoá người dùng"
        footer={
          <div className="flex items-center gap-4">
            <Button disabled={isPending}>Đóng</Button>
            <Button onClick={handleSubmit} type="primary" loading={isPending}>
              Xác nhận
            </Button>
          </div>
        }
      >
        <Form layout="vertical" initialValues={{ role: user.role }} form={form}>
          <Form.Item
            name={"description"}
            required
            label="Lý do"
            rules={[formRules.required("Lý do")]}
          >
            <TextArea placeholder="Nhập lý do" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalBlockUser;
