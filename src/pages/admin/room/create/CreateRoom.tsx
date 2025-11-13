import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Popconfirm, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { QUERYKEY } from "../../../../common/constants/queryKey";
import { useMessage } from "../../../../common/hooks/useMessage";
import { createRoom } from "../../../../common/services/room.service";
import type {
  IPayloadRoomWithSeats,
  IRoom,
} from "../../../../common/types/room";
import type { ISeat } from "../../../../common/types/seat";
import { formRules } from "../../../../common/utils/formRules";
import {
  generatePreviewSeats,
  getStyleSeatCard,
} from "../../../../common/utils/seat";
import { seatTypeColor } from "../../../../common/constants";

const CreateRoom = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { antdMessage, HandleError } = useMessage();
  const nav = useNavigate();
  const { seats, cols, rows, totalSeats } = generatePreviewSeats();
  const [seatsState, setSeatState] =
    useState<Omit<ISeat, "_id" | "roomId">[]>(seats);
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: IPayloadRoomWithSeats) => createRoom(payload),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes(QUERYKEY.ROOM),
      });
      nav("/admin/room");
    },
    onError: (err) => HandleError(err),
  });
  const handleSubmit = (values: Pick<IRoom, "name" | "description">) => {
    mutate({ ...values, cols, rows, capacity: totalSeats, seats: seatsState });
  };
  const handleUpdateStatusSeat = (seat: Omit<ISeat, "_id" | "roomId">) => {
    setSeatState((prevSeats) =>
      prevSeats.map((item) =>
        item.label === seat.label ? { ...item, status: !item.status } : item,
      ),
    );
  };

  return (
    <div className="bg-[#121822] w-full min-h-[85dvh] rounded-md shadow-md px-6 py-4 relative">
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
          <div className="flex items-start gap-6">
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
            <div className="flex-1 flex flex-col items-end gap-2">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${cols}, 40px)`,
                  gridTemplateRows: `repeat(${rows}, 40px)`,
                  gap: "8px",
                }}
              >
                {seatsState.map((seat) => (
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
              <div>
                <Tag color={seatTypeColor["NORMAL"]}>Ghế thường</Tag>
                <Tag color={seatTypeColor["VIP"]}>Ghế vip</Tag>
                <Tag color={seatTypeColor["COUPLE"]}>Ghế đôi</Tag>
                <Tag color={"#ef4444"}>Ghế bị khoá</Tag>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-6 mt-6">
            <Button
              loading={isPending}
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

export default CreateRoom;
