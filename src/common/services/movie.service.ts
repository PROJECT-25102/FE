import type { IMovie } from "../types/movie";
import type { IParams } from "../types/parameter";
import type { TypeResponse } from "../types/response";
import api from "../utils/api";

export const getAllMovie = async (
  params?: IParams,
): Promise<TypeResponse<IMovie[]>> => {
  const { data } = await api.get("/movie", { params });
  return data;
};

export const updateStatusMovie = async (id: string) => {
  const { data } = await api.patch(`/movie/status/${id}`);
  return data;
};
