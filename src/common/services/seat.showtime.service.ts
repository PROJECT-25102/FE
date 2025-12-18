import type { IParams } from "../types/parameter";
import type { TypeResponse } from "../types/response";
import type { ISeatStatus } from "../types/seat";
import api from "../utils/api";

const prefix = `/seat-status`;
export const getSeatShowtime = async (
  roomId: string,
  showtimeId: string,
  params?: IParams,
): Promise<
  TypeResponse<{ rows: number; cols: number; seats: ISeatStatus[] }>
> => {
  const { data } = await api.get(`${prefix}/seat-map/${roomId}/${showtimeId}`, {
    params,
  });
  return data;
};

export const toggleSeat = async (payload: {
  showtimeId: string;
  seatId: string;
  col: number;
  row: number;
  roomId: string;
  type: string;
}) => {
  const { data } = await api.post(`${prefix}/toogle-seat`, payload);
  return data;
};

export const unHoldSeat = async () => {
  const { data } = await api.patch(`${prefix}/un-hold`);
  return data;
};

export const extendHoldSeat = async (showtimeId: string, seatIds: string[]) => {
  const { data } = await api.patch(`${prefix}/extend-hold/${showtimeId}`, {
    seatIds,
  });
  return data;
};
