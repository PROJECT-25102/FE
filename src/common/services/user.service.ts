import type { TypeResponse } from "../types/response";
import type { IUser } from "../types/user";
import api from "../utils/api";

export const getProfile = async (): Promise<TypeResponse<IUser>> => {
  const { data } = await api.get("/user/private");
  return data;
};
