import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link, useNavigate, useParams } from "react-router";
import { QUERYKEY } from "../../../../common/constants/queryKey";
import { useMessage } from "../../../../common/hooks/useMessage";
import {
  getDetailCategory,
  updateCategory,
} from "../../../../common/services/category.service";
import type { ICategory } from "../../../../common/types/category";
import { formRules } from "../../../../common/utils/formRules";

const UpdateCategory = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { antdMessage, HandleError } = useMessage();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: Omit<ICategory, "status">) =>
      updateCategory(id as string, payload),
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
  const { data } = useQuery({
    queryKey: [QUERYKEY.CATEGORY, id],
    queryFn: async () => {
      const { data } = await getDetailCategory(id as string);
      if (data) {
        console.log(data);
        form.setFieldsValue(data);
      }
      return data;
    },
  });
  return (
    <div className="bg-[#121822] w-full min-h-[85dvh] rounded-md shadow-md px-6 py-4 relative">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-3">
          Cập nhật thể loại <Tag>Mã thể loại: {id}</Tag>
        </h3>
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
              onClick={() => form.setFieldsValue(data)}
              style={{ width: 150, height: 35 }}
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
              Cập nhật
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateCategory;
