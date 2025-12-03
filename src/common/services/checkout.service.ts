import type { IPayloadCheckout } from "../types/checkout";
import type { TypeResponse } from "../types/response";
import api from "../utils/api";

const prefix = `/check-out`;

export const checkoutWithVnpay = async (
  payload: IPayloadCheckout,
): Promise<TypeResponse<string>> => {
  const { data } = await api.post(`${prefix}/create-vnpay`, payload);
  return data;
};
