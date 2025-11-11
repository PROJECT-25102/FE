import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router";
import { formRules } from "../../../../common/utils/formRules";
import TextArea from "antd/es/input/TextArea";
import { useMessage } from "../../../../common/hooks/useMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ICategory } from "../../../../common/types/category";
import { createCategory } from "../../../../common/services/category.service";
import { QUERYKEY } from "../../../../common/constants/queryKey";

const CreateCategory = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const nav = useNavigate();
  const { antdMessage, HandleError } = useMessage();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: Omit<ICategory, "status">) => createCategory(payload),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(QUERYKEY.CATEGORY),
      });
      nav("/admin/category");
    },
    onError: (err) => {
      HandleError(err);
    },
  });
  const onSubmit = (values: Omit<ICategory, "status">) => {
    mutate(values);
  };
  return (
    <div className="bg-[#121822] w-full min-h-[85dvh] rounded-md shadow-md px-6 py-4 relative">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Thêm thể loại mới</h3>
        <Link
          to={"/admin/category"}
          className="text-white! hover:text-primary! hover:underline!"
        >
          Quay về danh sách
        </Link>
      </div>
      <div className="mt-4">
        <Form form={form} onFinish={onSubmit} layout="vertical">
          <Form.Item
            required
            label="Tên thể loại"
            name={"name"}
            rules={[
              formRules.required("Tên thể loại"),
              formRules.textRange("Tên thể loại", 3, 20),
            ]}
          >
            <Input
              placeholder="Nhập tên thể loại"
              style={{
                height: 35,
              }}
            />
          </Form.Item>
          <Form.Item
            required
            label="Mô tả thể loại"
            name={"description"}
            rules={[formRules.textRange("Mô tả thể loại", 3, 120)]}
          >
            <TextArea placeholder="Nhập mô tả thể loại" rows={5} />
          </Form.Item>
          <div className="flex justify-end gap-6 mt-6">
            <Button
              disabled={isPending}
              style={{ width: 150, height: 35 }}
              htmlType="reset"
            >
              Đặt lại
            </Button>
            <Button
              loading={isPending}
              disabled={isPending}
              style={{ width: 150, height: 35 }}
              htmlType="submit"
              type="primary"
            >
              Thêm mới
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateCategory;
