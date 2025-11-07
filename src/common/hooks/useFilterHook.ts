import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";
import type { IParams } from "../types/parameter";
import { useFilterStore } from "../stores/useFilterStore";

export const useFilterHook = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    query,
    setQuery,
    resetFilter,
    resetFilterExceptPageAndLimit,
    updateQueryParams,
    onChangeSearchInput,
  } = useFilterStore();

  // Khi load lần đầu -> lấy params từ URL vào store
  useEffect(() => {
    const params: IParams = {};
    searchParams.forEach((value, key) => (params[key] = value));
    setQuery(params);
  }, [searchParams, setQuery]);

  // Đồng bộ URL mỗi khi query thay đổi
  useEffect(() => {
    const newParams = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value) newParams.set(key, String(value));
    });
    navigate(`${pathname}?${newParams.toString()}`, { replace: true });
  }, [navigate, pathname, query]);

  return {
    query,
    updateQueryParams,
    resetFilter,
    resetFilterExceptPageAndLimit,
    onChangeSearchInput,
  };
};
