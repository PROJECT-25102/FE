import { App } from "antd";
import type { AxiosError } from "axios";

type ErrorOptions = {
  field?: string;
  type?: "error" | "info" | "warning" | "success";
  fallback?: string;
  silent?: boolean;
};
export const useMessage = () => {
  const { message: antdMessage } = App.useApp();
  const HandleError = (error: unknown, options?: ErrorOptions): string => {
    const {
      field = "message",
      type = "error",
      fallback = "Đã có lỗi xảy ra!",
      silent = false,
    } = options || {};

    const err = error as AxiosError<any>;
    const msg =
      (err?.response?.data && (err.response.data[field] as string)) ||
      err?.message ||
      fallback;

    if (!silent) antdMessage[type](msg);

    return msg;
  };

  return { HandleError, antdMessage };
};
