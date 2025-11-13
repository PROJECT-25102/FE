import type { IParams } from "../types/parameter";
import type { TypeResponse } from "../types/response";
import type { IPayloadRoomWithSeats, IRoom } from "../types/room";
import type { ISeat } from "../types/seat";
import api from "../utils/api";

export const getAllRoom = async (
  params?: IParams,
): Promise<TypeResponse<IRoom[]>> => {
  const { data } = await api.get(`/room`, { params });
  return data;
};

export const getSeatByRoom = async (
  roomId: string,
): Promise<TypeResponse<IRoom & { seats: ISeat[] }>> => {
  const { data } = await api.get(`/room/seat/${roomId}`);
  return data;
};

export const createRoom = async (
  payload: IPayloadRoomWithSeats,
): Promise<TypeResponse<IRoom & { seats: ISeat[] }>> => {
  const { data } = await api.post("/room", payload);
  return data;
};

export const updateRoom = async (
  id: string,
  payload: Omit<IRoom & { seats: ISeat[] }, "_id" | "status">,
): Promise<TypeResponse<IRoom>> => {
  const { data } = await api.patch(`/room/update/${id}`, payload);
  return data;
};

export const updateStatusRoom = async (id: string) => {
  const { data } = await api.patch(`/room/status/${id}`);
  return data;
};
