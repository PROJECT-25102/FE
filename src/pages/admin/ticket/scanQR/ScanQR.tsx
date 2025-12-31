import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Button, Input, Popconfirm, QRCode, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { DAYOFWEEK_LABEL } from "../../../../common/constants/dayOfWeek";
import { QUERYKEY } from "../../../../common/constants/queryKey";
import { useMessage } from "../../../../common/hooks/useMessage";
import {
  confirmTicket,
  veirifyTicket,
} from "../../../../common/services/ticket.service";
import type { TypeResponse } from "../../../../common/types/response";
import type { ITicket } from "../../../../common/types/ticket";
import { formatCurrency } from "../../../../common/utils";
import { PrinterOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";
import TicketPrint from "./components/TicketPrint";
const column = [
  {
    title: "Phòng chiếu",
    dataIndex: "roomName",
  },
  {
    title: "Số vé",
    dataIndex: "ticketCount",
  },
  {
    title: "Ghế",
    dataIndex: "seats",
  },
];
const ScanQR = () => {
  const [status, setStatus] = useState<
    "idle" | "scanning" | "success" | "error"
  >("idle");
  const [valueSearch, setValueSearch] = useState("");
  const [data, setData] = useState<TypeResponse<ITicket> | null>(null);
  const { antdMessage, HandleError } = useMessage();
  const queryClient = useQueryClient();
  const lastResultRef = useRef<string | null>(null);
  const scanningRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const stopCamera = () => {
    const video = document.querySelector("video");
    if (!video?.srcObject) return;
    const stream = video.srcObject as MediaStream;
    stream.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
  };
  const handleScan = async (result: any) => {
    const text = Array.isArray(result) ? result?.[0]?.rawValue : result;
    if (!text) return;

    if (scanningRef.current) return;
    if (lastResultRef.current === text) return;

    scanningRef.current = true;
    lastResultRef.current = text;
    setStatus("scanning");
    try {
      const data = await veirifyTicket(text);
      setData(data);
      stopCamera();
      setValueSearch(text.split("-")[1]);
    } catch (err: any) {
      setData(err?.response?.data || null);
      stopCamera();
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      scanningRef.current = false;
      lastResultRef.current = null;
    }, 1000);
  };

  const handleReset = () => {
    setData(null);
    setValueSearch("");
    setStatus("idle");
    scanningRef.current = false;
    lastResultRef.current = null;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => confirmTicket(id),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes(QUERYKEY.TICKET),
      });
      setData(null);
      setStatus("idle");
    },
    onError: (err) => HandleError(err),
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      stopCamera();
    };
  }, []);
  const rowData = data?.data
    ? [
        {
          key: 1,
          roomName: data?.data?.roomName,
          ticketCount: data?.data.items?.length,
          seats: data?.data.items?.map((item) => item.seatLabel).join(", "),
        },
      ]
    : [];
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });
  return (
    <div className="bg-[#121822] w-full min-h-[87vh] rounded-md shadow-md px-6 py-4 text-white">
      <div className="flex justify-between">
        <h3 className="text-base mb-4">Quét vé QR</h3>
        <Link to={"/admin/ticket"} className="text-primary! hover:underline!">
          Quay về danh sách
        </Link>
      </div>

      <div className="flex items-start gap-12 mt-8">
        <div>
          <div className="w-[350px] h-[350px] bg-black  rounded-lg overflow-hidden flex relative items-center justify-center">
            {data ? (
              <div className="flex flex-col gap-4 items-center p-6">
                <QRCode
                  value={data.success ? data.data.qrCode : data.message}
                />
                <p
                  className={`text-sm text-center ${
                    data.success ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {data.message}
                </p>
                <Button type="primary" onClick={handleReset}>
                  Quét lại
                </Button>
              </div>
            ) : (
              <>
                <Scanner
                  onScan={handleScan}
                  onError={() => {}}
                  constraints={{ facingMode: "environment", aspectRatio: 1 }}
                  classNames={{
                    video: "object-cover rounded-lg",
                  }}
                />

                {status !== "idle" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg">
                    {status === "scanning" && (
                      <span className="text-blue-400 text-lg font-medium">
                        Đang kiểm tra...
                      </span>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          <p className="my-4 text-center text-gray-300/50">Hoặc</p>
          <div>
            <Input.Search
              value={valueSearch}
              onSearch={(e) => handleScan(`BEE-${e}`)}
              onChange={(e) => setValueSearch(e.target.value)}
              prefix="BEE-"
            />
          </div>
        </div>
        <div className="bg-[#1a1d23] flex-1 p-6 rounded-xl">
          {data && data.data ? (
            <>
              <h2
                className={`text-center text-lg font-semibold ${
                  data.success ? "text-green-500" : "text-red-500"
                }`}
              >
                {data.message}
              </h2>
              <>
                <p className="mt-4 uppercase font-bold text-lg line-clamp-1">
                  {data?.data?.movieName}
                </p>
                <div className="flex items-start mt-4 justify-between">
                  <div>
                    <p className="text-gray-300/50 text-base">Người đặt</p>
                    <p className="font-semibold text-base">
                      {data?.data.customerInfo.userName}
                    </p>
                    <p className="text-gray-300/50 mt-4 text-base">Mã đặt vé</p>
                    <p className="font-semibold text-base uppercase">
                      {data?.data.ticketId || data?.data._id}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300/50 text-base mt-4">Người đặt</p>
                <p className="text-lg text-orange-500 font-semibold">
                  {dayjs(data?.data.startTime).format("HH:mm")}
                </p>
                <p className="text-lg font-semibold">
                  {DAYOFWEEK_LABEL[dayjs(data?.data.startTime).day()]} -{" "}
                  {dayjs(data?.data.startTime).format("DD/MM/YYYY")}
                </p>

                <div className="mt-4">
                  <Table
                    columns={column}
                    dataSource={rowData}
                    pagination={false}
                    bordered
                  />
                </div>
                <div className="flex itesm-center justify-between mt-4">
                  <p className="text-gray-300/50 text-base">Tổng tiền</p>
                  <p className="text-lg font-semibold">
                    {data && formatCurrency(data.data.totalPrice as number)}
                  </p>
                </div>
                {data.success && (
                  <div className="mt-4 flex items-center gap-6">
                    <Button
                      disabled={isPending}
                      loading={isPending}
                      icon={<PrinterOutlined />}
                      onClick={handlePrint}
                      className="w-full! h-[45px]!"
                    >
                      In vé
                    </Button>
                    <Popconfirm
                      title="Hãy chắn chắn bạn đã in vé cho khách hàng!"
                      onConfirm={() => mutate(data.data._id)}
                      okText="Chắc chắn"
                      cancelText="Huỷ bỏ"
                    >
                      <Button
                        disabled={isPending}
                        loading={isPending}
                        type="primary"
                        className="w-full! h-[45px]!"
                      >
                        Xác nhận sử dụng vé
                      </Button>
                    </Popconfirm>
                  </div>
                )}
                {data && (
                  <div style={{ display: "none" }}>
                    <TicketPrint ref={printRef} ticket={data.data} />
                  </div>
                )}
              </>
            </>
          ) : (
            <div className="min-h-[50vh]">
              <div className="flex flex-col items-center gap-4 justify-center min-h-[35vh]">
                <p className="font-semibold text-2xl">Vui quét mã</p>
                <p className="text-gray-300/50 text-base">
                  Đưa mã vào camera để có thể xác thực vé
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanQR;
