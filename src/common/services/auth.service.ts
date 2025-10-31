import type { IRegisterPayload } from "../types/auth";
import type { TypeResponse } from "../types/response";
import type { IUser } from "../types/user";
import api from "../utils/api";

export const registerApi = async (
  payload: Omit<IRegisterPayload, "confirmPassword">,
): Promise<TypeResponse<IUser>> => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};
