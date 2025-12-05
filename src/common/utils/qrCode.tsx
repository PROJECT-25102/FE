import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import type { QRCodeProps } from "antd";
import { STATUS_TICKET } from "../constants/ticket";

export const getStatusQrCode = (status: any) => {
  switch (status) {
    case STATUS_TICKET.PENDING:
      return undefined;
    case STATUS_TICKET.CONFIRMED:
      return "scanned";
    case STATUS_TICKET.CANCELLED:
      return "expired";
    default:
      return undefined;
  }
};
export const customStatusRender: QRCodeProps["statusRender"] = (info) => {
  switch (info.status) {
    case "expired":
      return (
        <div>
          <CloseCircleFilled style={{ color: "red" }} /> Vé đã bị huỷ
        </div>
      );
    case "scanned":
      return (
        <div>
          <CheckCircleFilled style={{ color: "green" }} /> Đã xem
        </div>
      );
    default:
      return null;
  }
};
