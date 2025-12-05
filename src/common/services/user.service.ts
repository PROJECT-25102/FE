import type { IParams } from "../types/parameter";
import type { TypeResponse } from "../types/response";
import type { ITicket } from "../types/ticket";
import type { IPayloadUpdateUser, IUser } from "../types/user";
import api from "../utils/api";

export const getProfile = async (): Promise<TypeResponse<IUser>> => {
  const { data } = await api.get("/user/private");
  return data;
};

export const updateProfile = async (
  payload: IPayloadUpdateUser,
): Promise<TypeResponse<IUser>> => {
  const { data } = await api.patch(`/user/update`, payload);
  return data;
};

export const changePassword = async (payload: {
  oldPassword: string;
  newPassword: string;
}): Promise<TypeResponse<IUser>> => {
  const { data } = await api.patch("/user/change-password", payload);
  return data;
};

export const getMyTicket = async (
  query: IParams,
): Promise<TypeResponse<ITicket[]>> => {
  const { data } = await api.get(`/user/my-ticket`, { params: query });
  return data;
};

export const getDetailMyTicket = async (
  ticketId: string,
): Promise<TypeResponse<ITicket>> => {
  const { data } = await api.get(`/user/my-ticket/detail/${ticketId}`);
  return data;
};
