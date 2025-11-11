import type { ICategory } from "../types/category";
import type { IParams } from "../types/parameter";
import type { TypeResponse } from "../types/response";
import api from "../utils/api";

export const getAllCategory = async (
  params?: IParams,
): Promise<TypeResponse<ICategory[]>> => {
  const { data } = await api.get(`/category`, { params });
  return data;
};

export const getDetailCategory = async (
  id: string,
): Promise<TypeResponse<ICategory>> => {
  const { data } = await api.get(`/category/detail/${id}`);
  return data;
};

export const createCategory = async (
  payload: Omit<ICategory, "createdAt" | "updatedAt" | "status">,
): Promise<TypeResponse<ICategory>> => {
  const { data } = await api.post("/category", payload);
  return data;
};

export const updateCategory = async (
  id: string,
  payload: Omit<ICategory, "createdAt" | "updatedAt" | "status">,
): Promise<TypeResponse<ICategory>> => {
  const { data } = await api.patch(`/category/update/${id}`, payload);
  return data;
};

export const updateStatusCategory = async (
  id: string,
): Promise<TypeResponse<ICategory>> => {
  const { data } = await api.patch(`/category/status/${id}`);
  return data;
};
