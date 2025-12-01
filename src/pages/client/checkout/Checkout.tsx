import { Button, Checkbox, Radio, Table } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState<"momo">("momo");
  const nav = useNavigate();
  const myHoldSeats = [
    { label: "C5", type: "NORMAL", price: 70000 },
    { label: "C6", type: "NORMAL", price: 70000 },
  ];
  const dataSource = [
    {
      key: "1",
      category: `Ghế (${myHoldSeats.map((s) => s.label).join(", ")})`,
      quantity: myHoldSeats.length,
      total: myHoldSeats.reduce((sum, seat) => sum + seat.price, 0),
    },
  ];
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

  return (
    <section className="min-h-[70vh]">
      <div
        className="grid max-w-7xl xl:mx-auto mx-6 gap-6 mt-8"
        style={{ gridTemplateColumns: "2.5fr 1fr" }}
      >
        <div>
          <div className="bg-[#1a1d23] p-6 rounded-xl">
            <h2 className="font-bold text-base">Thông tin phim</h2>

            <div className="flex flex-col gap-1 mt-4 text-base">
              <p>Phim</p>
              <p className="uppercase font-bold">Kimetsu no yaiba</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1 mt-6 text-base">
                <p>Ngày giờ chiếu</p>
                <p className="uppercase font-bold">
                  <span className="text-[#f97316]">19:20</span> - 01/12/2025
                </p>
              </div>

              <div className="flex flex-col gap-1 mt-6 text-base">
                <p>Ghế</p>
                <p className="uppercase font-bold">
                  {myHoldSeats.map((s) => s.label).join(", ")}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1 mt-6 text-base">
              <p>Phòng chiếu</p>
              <p className="uppercase font-bold">13</p>
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
        <div className="bg-[#1a1d23] p-6 rounded-lg">
          <h2 className="font-bold text-base">Phương thức thanh toán</h2>
          <div className="flex flex-col justify-between h-full pb-8">
            <div className="flex flex-col gap-2 mt-4">
              <div
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
              </div>
            </div>
            <div className="mt-4 text-base">
              <h3 className="font-bold text-base">Chi phí</h3>
              <div className="flex items-center justify-between mt-4">
                <p>Thanh toán</p>
                <p className="font-bold">160.000đ</p>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p>Thanh toán</p>
                <p className="font-bold">0đ</p>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p>Tổng cộng</p>
                <p className="font-bold">160.000đ</p>
              </div>
              <div className="mt-2">
                <Checkbox>
                  Tôi xác nhận các thông tin đã chính xác và đồng ý với các điều
                  khoản và chính sách
                </Checkbox>
                <Button type="primary" className="w-full mt-4">
                  Thanh toán
                </Button>
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
