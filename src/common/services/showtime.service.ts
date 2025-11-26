import type { IParams } from "../types/parameter";
import type { TypeResponse } from "../types/response";
import type {
  ICreateManyShowtimePayload,
  ICreateShowtimePayload,
  IMovieHasShowtime,
  IShowtime,
  IWeekdayShowtime,
} from "../types/showtime";
import api from "../utils/api";

const prefix = "/showtime";

export const getMovieHasShowtime = async (
  params?: IParams,
): Promise<TypeResponse<IMovieHasShowtime[]>> => {
  const { data } = await api.get(`${prefix}/movie`, { params });
  return data;
};

export const getAllShowtime = async (
  params?: IParams,
): Promise<TypeResponse<IShowtime[]>> => {
  const { data } = await api.get(`${prefix}`, { params });
  return data;
};

export const getShowtimeWeekday = async (
  params?: IParams,
): Promise<TypeResponse<IWeekdayShowtime>> => {
  const { data } = await api.get(`${prefix}/weekday`, { params });
  return data;
};

export const createManyShowtime = async (
  payload: ICreateManyShowtimePayload,
): Promise<TypeResponse<IShowtime[]>> => {
  const { data } = await api.post(`${prefix}/many`, payload);
  return data;
};

export const createShowtime = async (
  payload: ICreateShowtimePayload,
): Promise<TypeResponse<IShowtime>> => {
  const { data } = await api.post(`${prefix}`, payload);
  return data;
};
