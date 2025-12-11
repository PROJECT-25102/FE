import { useMutation } from "@tanstack/react-query";
import { Button, Checkbox, Form, Input, Radio, Table, Tooltip } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { SEAT_TYPE_LABEL } from "../../../common/constants/seat";
import { useMessage } from "../../../common/hooks/useMessage";
import { checkoutWithVnpay } from "../../../common/services/checkout.service";
import { useAuthSelector } from "../../../common/stores/useAuthStore";
import { useCheckoutSelector } from "../../../common/stores/useCheckoutStore";
import type { IPayloadCheckout } from "../../../common/types/checkout";
import { formatCurrency } from "../../../common/utils";
import { formRules } from "../../../common/utils/formRules";
import CountTime from "../../../components/CountTime";
import dayjs from "dayjs";
const columns = [
  {
    title: <p className="whitespace-nowrap m-0">Danh mục</p>,
    dataIndex: "category",
  },
  {
    title: <p className="whitespace-nowrap m-0">Số lượng</p>,
    dataIndex: "quantity",
  },
  {
    title: <p className="whitespace-nowrap m-0">Tổng tiền</p>,
    dataIndex: "total",
    render: (value: number) => <p>{value.toLocaleString("vi-VN") + " đ"}</p>,
  },
];
const Checkout = () => {
  const { movieId, roomId } = useParams();
  const [agreePolicy, setAgreePolicy] = useState(false);
  const { seat, totalPrice, showtime, movie, room } = useCheckoutSelector(
    (state) => ({
      movie: state.movie,
      seat: state.seat,
      showtime: state.showtime,
      totalPrice: state.totalPrice,
      room: state.room,
    }),
  );
  const user = useAuthSelector((state) => state.user);
  const [paymentMethod, setPaymentMethod] = useState<"momo" | "vnpay">("vnpay");
  const nav = useNavigate();
  const [form] = Form.useForm();

  const grouped = seat.reduce(
    (acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    },
    {} as Record<string, typeof seat>,
  );
  const dataSource = Object.entries(grouped).map(([type, seats], index) => ({
    key: index + 1,
    category: `${SEAT_TYPE_LABEL[type]} (${seats.map((s) => s.label).join(", ")})`,
    quantity: seats.length,
    total: seats.reduce((sum, s) => sum + s.price, 0),
  }));
  const { HandleError } = useMessage();
  const vnPaymutation = useMutation({
    mutationFn: (payload: IPayloadCheckout) => checkoutWithVnpay(payload),
    onSuccess: ({ data }) => (window.location.href = data),
    onError: (err) => HandleError(err),
  });
  const handleCheckout = async () => {
    const values = await form.validateFields();
    const payload: IPayloadCheckout = {
      showtimeId: showtime?._id,
      customerInfo: values,
      roomId,
      movieId,
      roomName: room?.name,
      movieName: movie?.name,
      items: seat.map((item) => ({
        seatId: item._id,
        seatLabel: item.label,
        price: item.price,
        type: item.type,
      })),
      startTime: showtime?.startTime,
      qrCode: "null",
      totalPrice,
    };
    vnPaymutation.mutate(payload);
  };
  return (
    <section className="min-h-[70vh]">
      <div
        className="grid max-w-7xl xl:mx-auto mx-6 gap-6 mt-8"
        style={{ gridTemplateColumns: "2.5fr 1fr" }}
      >
        <div>
          <div className="bg-[#1a1d23] p-6 rounded-xl">
            <h2 className="font-bold text-base">Thông khách hàng</h2>
            <Form
              initialValues={{
                email: user?.email,
                phone: user?.phone,
                userName: user?.userName,
              }}
              form={form}
              layout="vertical"
              className="mt-4!"
            >
              <Form.Item
                label="Email"
                name={"email"}
                required
                rules={[formRules.required("email")]}
              >
                <Input placeholder="Nhập email của bạn" />
              </Form.Item>
              <Form.Item
                label="Họ và tên"
                name={"userName"}
                required
                rules={[
                  formRules.required("Họ và tên"),
                  formRules.textRange("Họ và tên", 2, 50),
                ]}
              >
                <Input placeholder="Nhập họ tên của bạn" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name={"phone"}
                required
                rules={[
                  formRules.required("Số điện thoại"),
                  formRules.textRange("Số điện thoại", 6, 15),
                ]}
              >
                <Input placeholder="Nhập số điện thoại của bạn" />
              </Form.Item>
            </Form>
          </div>

          <div className="bg-[#1a1d23] p-6 rounded-xl mt-8">
            <h2 className="font-bold text-base">Thông tin phim</h2>

            <div className="flex flex-col gap-1 mt-4 text-base">
              <p>Phim</p>
              <p className="uppercase font-bold">
                {movie?.name || "Có lỗi xảy ra"}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1 mt-6 text-base">
                <p>Ngày giờ chiếu</p>
                <p className="uppercase font-bold">
                  <span className="text-[#f97316]">
                    {dayjs(showtime?.startTime).format("HH:mm")}
                  </span>{" "}
                  - {dayjs(showtime?.startTime).format("DD/MM/YYYY")}
                </p>
              </div>

              <div className="flex flex-col gap-1 mt-6 text-base">
                <p>Ghế</p>
                <p className="uppercase font-bold">
                  {seat.map((s) => s.label).join(", ")}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1 mt-6 text-base">
              <p>Phòng chiếu</p>
              <p className="uppercase font-bold">{room?.name}</p>
            </div>
          </div>

          <div className="bg-[#1a1d23] p-6 rounded-xl mt-6">
            <h2 className="font-bold text-base">Thông tin thanh toán</h2>
            <div className="mt-4">
              <Table
                columns={columns}
                bordered
                dataSource={dataSource}
                pagination={false}
              />
            </div>
          </div>
        </div>
        <div className="bg-[#1a1d23] sticky top-4 p-6 rounded-lg max-h-[70vh]">
          <div className="flex items-end justify-between">
            <h2 className="font-bold text-base">Phương thức thanh toán</h2>
            <CountTime />
          </div>
          <div className="flex flex-col justify-between h-full pb-8">
            <div className="flex flex-col gap-2 mt-4">
              <div
                onClick={() => setPaymentMethod("vnpay")}
                className={`border ${paymentMethod === "vnpay" ? "border-primary" : "border-gray-300/30"} cursor-pointer rounded-lg p-6 flex items-center gap-2`}
              >
                <Radio checked={paymentMethod === "vnpay"} />
                <img
                  src="https://chieuphimquocgia.com.vn/images/vnpay.svg"
                  alt=""
                  className="w-12"
                />
                <p className="font-semibold">VN Pay</p>
              </div>
              {/* <div
                onClick={() => setPaymentMethod("momo")}
                className={`border ${paymentMethod === "momo" ? "border-primary" : "border-gray-300/30"} cursor-pointer rounded-lg p-6 flex items-center gap-2`}
              >
                <Radio checked={paymentMethod === "momo"} />
                <img
                  src="https://chieuphimquocgia.com.vn/_next/image?url=%2Fimages%2Fmomo3.png&w=128&q=75"
                  alt=""
                  className="w-12"
                />
                <p className="font-semibold">MoMo</p>
              </div> */}
            </div>
            <div className="mt-4 text-base">
              <h3 className="font-bold text-base">Chi phí</h3>
              <div className="flex items-center justify-between mt-4">
                <p>Thanh toán</p>
                <p className="font-bold">{formatCurrency(totalPrice)}</p>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p>Phí</p>
                <p className="font-bold">{formatCurrency(0)}</p>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p>Tổng cộng</p>
                <p className="font-bold">{formatCurrency(totalPrice)}</p>
              </div>
              <div className="mt-2">
                <Checkbox onChange={(e) => setAgreePolicy(e.target.checked)}>
                  Tôi xác nhận các thông tin đã chính xác và đồng ý với các điều
                  khoản và chính sách
                </Checkbox>
                <Tooltip
                  title={`${!agreePolicy ? "Bạn phải đồng ý với điều khoản và chính sách của chúng tôi" : ""}`}
                >
                  <Button
                    loading={vnPaymutation.isPending}
                    type="primary"
                    onClick={handleCheckout}
                    disabled={!agreePolicy}
                    className="w-full mt-4"
                  >
                    Thanh toán
                  </Button>
                </Tooltip>
                <p
                  onClick={() => nav(-1)}
                  className="text-center cursor-pointer transition hover:opacity-80 mt-4 text-sm"
                >
                  Quay về
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
