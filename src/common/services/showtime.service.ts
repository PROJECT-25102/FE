import type { IParams } from "../types/parameter";
import type { TypeResponse } from "../types/response";
import type { IMovieHasShowtime, IShowtime } from "../types/showtime";
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
