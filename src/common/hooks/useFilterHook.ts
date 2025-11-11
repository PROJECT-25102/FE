import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useEffect, useRef } from "react";
import type { IParams } from "../types/parameter";
import { useFilterStore } from "../stores/useFilterStore";
import { debounce } from "lodash";

export const useFilterHook = (debounceTime = 100) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isFirstLoadRef = useRef(true);
  const {
    query,
    setQuery,
    resetFilter,
    resetFilterExceptPageAndLimit,
    updateQueryParams,
    onChangeSearchInput,
  } = useFilterStore();

  useEffect(() => {
    const params: IParams = {};
    searchParams.forEach((value, key) => (params[key] = value));
    const timeout = setTimeout(() => {
      setQuery(params);
      isFirstLoadRef.current = false;
    }, 50);
    return () => clearTimeout(timeout);
  }, [pathname, searchParams, setQuery]);
  useEffect(() => {
    if (isFirstLoadRef.current) return;
    const updateUrl = () => {
      const newParams = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "")
          newParams.set(key, String(value));
      });
      navigate(`${pathname}?${newParams.toString()}`, { replace: true });
    };
    const debounced = debounce(updateUrl, debounceTime);
    debounced();
    return () => debounced.cancel();
  }, [query, pathname, navigate, debounceTime]);
  return {
    query,
    updateQueryParams,
    resetFilter,
    resetFilterExceptPageAndLimit,
    onChangeSearchInput,
  };
};
