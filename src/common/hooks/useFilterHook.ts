import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useFilterStore } from "../stores/useFilterStore";
import type { IParams } from "../types/parameter";
import { debounce } from "lodash";

export const useFilterHook = (prefix = "") => {
  prefix = prefix ? prefix + "_" : prefix;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isFirstLoadRef = useRef(true);
  const {
    query,
    getQuery,
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
    const debounced = debounce(updateUrl, 100);
    debounced();
    return () => debounced.cancel();
  }, [query, pathname, navigate]);

  return {
    query: getQuery(prefix),
    updateQueryParams: (params: IParams) => updateQueryParams(params, prefix),
    resetFilter: () => resetFilter(prefix),
    resetFilterExceptPageAndLimit: () => resetFilterExceptPageAndLimit(prefix),
    onChangeSearchInput: (
      text: string,
      options: { enableOnChangeSearch: boolean },
    ) => onChangeSearchInput(text, { ...options, prefix }),
  };
};
