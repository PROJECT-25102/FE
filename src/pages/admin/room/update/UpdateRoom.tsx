import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Popconfirm, Spin, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { seatTypeColor } from "../../../../common/constants";
import { QUERYKEY } from "../../../../common/constants/queryKey";
import { useMessage } from "../../../../common/hooks/useMessage";
import {
  getSeatByRoom,
  updateRoom,
} from "../../../../common/services/room.service";
import type { IRoom } from "../../../../common/types/room";
import type { ISeat } from "../../../../common/types/seat";
import { formRules } from "../../../../common/utils/formRules";
import { getStyleSeatCard } from "../../../../common/utils/seat";

const UpdateRoom = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { antdMessage, HandleError } = useMessage();
  const nav = useNavigate();
  const [seats, setSeats] = useState<ISeat[]>([]);
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: Omit<IRoom & { seats: ISeat[] }, "_id" | "status">) =>
      updateRoom(id as string, payload),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes(QUERYKEY.ROOM),
      });
      nav("/admin/room");
    },
    onError: (err) => HandleError(err),
  });
  const handleSubmit = (values: Omit<IRoom, "_id" | "status">) => {
    mutate({ ...values, seats });
  };
  const handleUpdateStatusSeat = (seat: Omit<ISeat, "_id" | "roomId">) => {
    setSeats((prevSeats) =>
      prevSeats.map((item) =>
        item.label === seat.label ? { ...item, status: !item.status } : item,
      ),
    );
  };
  const { data, isLoading } = useQuery({
    queryKey: [QUERYKEY.ROOM, id],
    queryFn: async () => {
      const { data } = await getSeatByRoom(id as string);
      return data;
    },
  });
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
      setSeats(data.seats);
    }
  }, [data, form]);
  return (
    <div className="bg-[#121822] w-full min-h-[85dvh] rounded-md shadow-md px-6 py-4 relative">
      {isLoading ? (
        <div className="absolute top-[40%] -translate-[50%] left-[50%]">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Thêm phòng chiếu mới</h3>
            <Link
              to={"/admin/room"}
              className="text-white! hover:text-primary! hover:underline!"
            >
              Quay về danh sách
            </Link>
          </div>
          <div className="mt-4">
            <Form onFinish={handleSubmit} layout="vertical" form={form}>
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <Form.Item
                    required
                    name={"name"}
                    label="Tên phòng chiếu"
                    rules={[
                      formRules.required("Tên phòng chiếu"),
                      formRules.textRange("Tên phòng chiếu", 3, 20),
                    ]}
                  >
                    <Input
                      placeholder="Nhập tên phòng chiếu"
                      style={{ height: 35 }}
                    />
                  </Form.Item>
                  <Form.Item
                    name={"description"}
                    label="Mô tả phòng chiếu"
                    rules={[formRules.textRange("Mô tả phòng chiếu", 3, 200)]}
                  >
                    <TextArea placeholder="Nhập mô tả phòng chiếu" rows={5} />
                  </Form.Item>
                </div>
                <div className="flex-1 flex items-end flex-col gap-2">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${data?.cols}, 35px)`,
                      gridTemplateRows: `repeat(${data?.rows}, 35px)`,
                      gap: "8px",
                    }}
                  >
                    {seats.map((seat) => (
                      <Popconfirm
                        title={
                          seat.status
                            ? `Khoá ghế ${seat.label}`
                            : `Mở khoá ghế ${seat.label}`
                        }
                        description={
                          seat.status
                            ? "Bạn có chắc chắn khoá ghế này lại?"
                            : "Bạn có chắc chắn mở khoá ghế này?"
                        }
                        onConfirm={() => handleUpdateStatusSeat(seat)}
                      >
                        <div style={{ ...getStyleSeatCard(seat as ISeat) }}>
                          {seat.label}
                        </div>
                      </Popconfirm>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Tag color={seatTypeColor["NORMAL"]}>Ghế thường</Tag>
                    <Tag color={seatTypeColor["VIP"]}>Ghế vip</Tag>
                    <Tag color={seatTypeColor["COUPLE"]}>Ghế đôi</Tag>
                    <Tag color={"#ef4444"}>Ghế bị khoá</Tag>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-6 mt-6">
                <Button
                  onClick={() => {
                    if (data) {
                      form.setFieldsValue(data);
                      setSeats(data.seats);
                    }
                  }}
                  loading={isPending}
                  disabled={isPending}
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
        </>
      )}
    </div>
  );
};

export default UpdateRoom;
