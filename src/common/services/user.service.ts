import type { TypeResponse } from "../types/response";
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
