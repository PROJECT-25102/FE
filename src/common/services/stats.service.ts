import type { IParams } from "../types/parameter";
import type { TypeResponse } from "../types/response";
import type { IOverviewStats, IOverviewStatsYear } from "../types/stats";
import api from "../utils/api";

const prefixStats = "/stats";
const prefixOverview = "/overview";

export const statsOverview = {
  getOverviewStats: async (
    params?: IParams,
  ): Promise<TypeResponse<IOverviewStats>> => {
    const { data } = await api.get(`${prefixStats}/${prefixOverview}`, {
      params,
    });
    return data;
  },
  getOverviewByYear: async (
    params?: IParams,
  ): Promise<TypeResponse<IOverviewStatsYear>> => {
    const { data } = await api.get(
      `${prefixStats}/${prefixOverview}/month-of-year`,
      { params },
    );
    return data;
  },
};
