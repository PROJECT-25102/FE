import type { IParams } from "../types/parameter";
import type { TypeResponse } from "../types/response";
import type { IRoom } from "../types/room";
import api from "../utils/api";

export const getAllRoom = async (
  params?: IParams,
): Promise<TypeResponse<IRoom[]>> => {
  const { data } = await api.get(`/room`, { params });
  return data;
};

export const updateStatusRoom = async (id: string) => {
  const { data } = await api.patch(`/room/status/${id}`);
  return data;
};
