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

export const getDetailMovie = async (
  id: string,
): Promise<TypeResponse<IMovie>> => {
  const { data } = await api.get(`/movie/detail/${id}`);
  return data;
};

export const updateStatusMovie = async (id: string) => {
  const { data } = await api.patch(`/movie/status/${id}`);
  return data;
};

export const createMovieAPI = async (
  payload: any,
): Promise<TypeResponse<IMovie>> => {
  const { data } = await api.post("/movie", payload);
  return data;
};

export const updateMovieAPI = async (
  id: string,
  payload: any,
): Promise<TypeResponse<IMovie>> => {
  const { data } = await api.patch(`/movie/update/${id}`, payload);
  return data;
};
