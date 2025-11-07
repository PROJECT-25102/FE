import { create } from "zustand";
import type { IParams } from "../types/parameter";
import { debounce } from "lodash";

interface FilterState {
  query: IParams;
  setQuery: (query: IParams) => void;
  resetFilter: () => void;
  resetFilterExceptPageAndLimit: () => void;
  updateQueryParams: (params: IParams) => void;
  onChangeSearchInput: (
    text: string,
    options: { enableOnChangeSearch: boolean },
  ) => void;
}

export const useFilterStore = create<FilterState>((set, get) => ({
  query: {},

  setQuery: (query) => set({ query }),

  resetFilter: () => set({ query: {} }),

  resetFilterExceptPageAndLimit: () => {
    const { query } = get();
    const newQuery: IParams = {};
    if (query.page) newQuery.page = query.page;
    if (query.limit) newQuery.limit = query.limit;
    set({ query: newQuery });
  },

  updateQueryParams: (params: IParams) => {
    const newParams: IParams = {};
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") newParams[key] = value;
    }
    set({ query: newParams });
  },

  onChangeSearchInput: debounce(
    (text: string, options: { enableOnChangeSearch: boolean }) => {
      const { query, updateQueryParams } = get();
      if (options.enableOnChangeSearch) {
        updateQueryParams({ ...query, search: text });
      }
    },
    500,
  ),
}));
