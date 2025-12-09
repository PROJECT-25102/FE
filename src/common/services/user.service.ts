import type { IParams } from "../types/parameter";
import type { TypeResponse } from "../types/response";
import type { ITicket } from "../types/ticket";
import type {
  CreateUserPayload,
  IPayloadUpdateUser,
  IUser,
} from "../types/user";
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

export const getAllUser = async (
  params?: IParams,
): Promise<TypeResponse<IUser[]>> => {
  const { data } = await api.get(`/user/all`, { params });
  return data;
};

export const bannedUser = async (
  id: string,
  payload: { isBanned: boolean; description: string; bannedAt: string },
): Promise<TypeResponse<IUser>> => {
  const { data } = await api.patch(`/user/banned/${id}`, payload);
  return data;
};

export const createUser = async (
  payload: CreateUserPayload,
): Promise<TypeResponse<IUser>> => {
  const { data } = await api.post("/user/create", payload);
  return data;
};
export const updateUser = async (
  id: string,
  payload: Partial<IUser>,
): Promise<TypeResponse<IUser>> => {
  const { data } = await api.patch(`/user/update-admin/${id}`, payload);
  return data;
};
