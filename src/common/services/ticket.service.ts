import type { IParams } from "../types/parameter";
import type { TypeResponse } from "../types/response";
import type { ITicket } from "../types/ticket";
import api from "../utils/api";

const prefix = "/ticket";

export const getAllTicket = async (
  params?: IParams,
): Promise<TypeResponse<ITicket[]>> => {
  const { data } = await api.get(`${prefix}`, { params });
  return data;
};

export const veirifyTicket = async (
  id: string,
): Promise<TypeResponse<ITicket>> => {
  const { data } = await api.post(`${prefix}/verify/${id}`);
  return data;
};

export const confirmTicket = async (
  id: string,
): Promise<TypeResponse<ITicket>> => {
  const { data } = await api.patch(`${prefix}/confirm/${id}`);
  return data;
};
