import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
} from "antd";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router";
import { useMessage } from "../../../../common/hooks/useMessage";
import { createMovieAPI } from "../../../../common/services/movie.service";
import { formRules } from "../../../../common/utils/formRules";
import { uploadImage } from "../../../../common/utils/upload";
import UploadImage from "../../../../components/UploadImage";
import { QUERYKEY } from "../../../../common/constants/queryKey";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";

const CreateMovie = () => {
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const { antdMessage, HandleError } = useMessage();
  const { mutateAsync } = useMutation({
    mutationFn: (payload: any) => createMovieAPI(payload),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(QUERYKEY.MOVIE),
      });
      nav("/admin/movie");
    },
    onError: (err) => {
      setLoading(false);
      HandleError(err);
    },
  });
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const posterUrl = await uploadImage(values.poster[0].originFileObj as File);
    if (!posterUrl) {
      setLoading(false);
      antdMessage.error("Upload ảnh thất bại");
      return;
    }
    values.poster = posterUrl;
    values.releaseDate = dayjs(values.releaseDate).format("YYYY-MM-DD");
    await mutateAsync({ ...values, status: true });
    setLoading(false);
  };
  return (
    <div className="bg-[#121822] w-full min-h-[85dvh] rounded-md shadow-md px-6 py-4 relative">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Thêm phim mới</h3>
        <Link
          to={"/admin/movie"}
          className="text-white! hover:text-primary! hover:underline!"
        >
          Quay về danh sách
        </Link>
      </div>
      <div className="mt-4">
        <Form onFinish={handleSubmit} layout="vertical" form={form}>
          <section className="flex items-start gap-8">
            <Form.Item
              label="Poster phim"
              name={"poster"}
              valuePropName="value"
              getValueFromEvent={(e) => e}
              rules={[{ required: true, message: "Vui lòng tải ảnh lên!" }]}
            >
              <UploadImage width={200} height={310} />
            </Form.Item>
            <div className="flex-1">
              <Form.Item
                label="Tên phim"
                name={"name"}
                required
                rules={[
                  formRules.textRange("Tên phim", 3, 60),
                  formRules.required("Tên phim"),
                ]}
              >
                <Input placeholder="Nhập tên phim" style={{ height: 35 }} />
              </Form.Item>
              <Form.Item
                label="Thời gian chiếu"
                name={"duration"}
                required
                initialValue={10}
                rules={[formRules.required("Thời gian chiếu phim")]}
              >
                <InputNumber
                  min={10}
                  max={360}
                  className="custom-input-number"
                  placeholder="Nhập số phút chiếu phim"
                  addonAfter={"Phút"}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label="Thể loại phim"
                tooltip="Nhập tên thể loại và ấn enter bạn có thể thêm thể loại phim tiếp theo"
                name={"category"}
                required
                rules={[formRules.required("Thể loại phim")]}
              >
                <Select
                  suffixIcon={null}
                  mode="tags"
                  placeholder="Nhập tên thể loại và nhấn enter"
                  style={{ width: "100%", height: 35 }}
                  tokenSeparators={[","]}
                  open={false}
                />
              </Form.Item>
              <Form.Item
                label="Phim dành cho lứa tuổi"
                name={"ageRequire"}
                required
                rules={[formRules.required("Vui lòng chọn lứa tuổi phù hợp")]}
              >
                <Select
                  placeholder="Chọn độ tuổi"
                  style={{ width: "100%", height: 35 }}
                  options={[
                    { value: "P", label: "P - Phù hợp với mọi lứa tuổi" },
                    { value: "K", label: "K - Dành cho trẻ em" },
                    { value: "C13", label: "C13 - Cấm khán giả dưới 13 tuổi" },
                    { value: "C16", label: "C16 - Cấm khán giả dưới 16 tuổi" },
                    { value: "C18", label: "C18 - Cấm khán giả dưới 18 tuổi" },
                  ]}
                />
              </Form.Item>
            </div>
          </section>
          <section className="flex items-center gap-6">
            <div className="flex-1">
              <Form.Item
                label="Đạo diễn"
                name={"director"}
                tooltip="Nhập tên một diễn viên bất kỳ và enter bạn có thể nhập được tên diễn viên tiếp theo"
                required
                rules={[
                  { required: true, message: "Vui lòng nhập tên đạo diễn" },
                ]}
              >
                <Input placeholder="Nhập tên đạo diễn" style={{ height: 35 }} />
              </Form.Item>
              <Form.Item
                label="Diễn viên"
                name={"actor"}
                tooltip="Nhập tên một diễn viên bất kỳ và enter bạn có thể nhập được tên diễn viên tiếp theo"
                required
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập danh sách diễn viên",
                  },
                ]}
              >
                <Select
                  mode="tags"
                  suffixIcon={null}
                  placeholder="Nhập tên diễn viên và nhấn Enter"
                  style={{ width: "100%", height: 35 }}
                  tokenSeparators={[","]}
                  open={false}
                />
              </Form.Item>
            </div>
            <div className="flex-1">
              <Form.Item label="Trailer youtube" name={"trailer"}>
                <Input placeholder="Nhập link youtube" style={{ height: 35 }} />
              </Form.Item>
              <Form.Item
                label="Ngày công chiếu"
                name={"releaseDate"}
                required
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày công chiếu",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Chọn ngày công chiếu"
                  style={{ height: 35, width: "100%" }}
                  disabledDate={(current) =>
                    current && current < dayjs().startOf("day")
                  }
                />
              </Form.Item>
            </div>
          </section>
          <Form.Item label="Mô tả phim" name={"description"}>
            <TextArea rows={5} placeholder="Nhập mô tả phim" />
          </Form.Item>
          <Form.Item
            label="Phim nổi bật"
            name="isFeatured"
            valuePropName="checked"
          >
            <Switch size="default" style={{ transform: `scale(1.2)` }} />
          </Form.Item>

          <div className="flex justify-end gap-6 mt-6">
            <Button
              disabled={isLoading}
              style={{ width: 150, height: 35 }}
              htmlType="reset"
            >
              Đặt lại
            </Button>
            <Button
              loading={isLoading}
              disabled={isLoading}
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

export default CreateMovie;
