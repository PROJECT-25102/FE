import { Button, Form, Modal, Select } from "antd";
import React, { useState, type ReactElement } from "react";
import { ROLE, ROLE_LABEL } from "../../../../common/constants/user";
import type { IUser } from "../../../../common/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../../../common/services/user.service";
import { useMessage } from "../../../../common/hooks/useMessage";
import { QUERYKEY } from "../../../../common/constants/queryKey";
import { formRules } from "../../../../common/utils/formRules";

const ModalUpdateUser = ({
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
    mutationFn: (payload: Partial<IUser>) => updateUser(user._id, payload),
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
    mutate(values);
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
        title="Cập nhật người dùng"
        footer={
          <div className="flex items-center gap-4">
            <Button disabled={isPending}>Đóng</Button>
            <Button onClick={handleSubmit} type="primary" loading={isPending}>
              Cập nhật
            </Button>
          </div>
        }
      >
        <Form layout="vertical" initialValues={{ role: user.role }} form={form}>
          <Form.Item
            name={"role"}
            label="Vai trò"
            rules={[formRules.required("Vai trò", "choose")]}
          >
            <Select
              options={[
                { value: ROLE.ADMIN, label: ROLE_LABEL[ROLE.ADMIN] },
                { value: ROLE.USER, label: ROLE_LABEL[ROLE.USER] },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
