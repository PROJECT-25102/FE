import type { IParams } from "../types/parameter";
import type { TypeResponse } from "../types/response";
import type {
  IOverviewStats,
  IOverviewStatsYear,
  ISeatTypeTrendResponse,
  ITicketHourlyTrendResponse,
  ITicketOverviewStats,
  ITopMovieResponse,
} from "../types/stats";
import api from "../utils/api";

const prefixStats = "/stats";
const prefixOverview = "/overview";
const prefixTicket = "/ticket";

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

export const ticketStats = {
  getOverviewStatsTicket: async (
    params?: IParams,
  ): Promise<TypeResponse<ITicketOverviewStats>> => {
    const { data } = await api.get(`${prefixStats}${prefixTicket}`, { params });
    return data;
  },
  getTicketTrendHourly: async (
    params?: IParams,
  ): Promise<TypeResponse<ITicketHourlyTrendResponse>> => {
    const { data } = await api.get(`${prefixStats}${prefixTicket}/trend`, {
      params,
    });
    return data;
  },
  getTicketTodayHourly: async (
    params?: IParams,
  ): Promise<TypeResponse<ITicketHourlyTrendResponse>> => {
    const { data } = await api.get(
      `${prefixStats}${prefixTicket}/trend-today`,
      {
        params,
      },
    );
    return data;
  },
  getTopMovieTrend: async (
    params?: IParams,
  ): Promise<TypeResponse<ITopMovieResponse>> => {
    const { data } = await api.get(`${prefixStats}${prefixTicket}/top-movie`, {
      params,
    });
    return data;
  },
  getTypeSeatTrend: async (
    params?: IParams,
  ): Promise<TypeResponse<ISeatTypeTrendResponse>> => {
    const { data } = await api.get(`${prefixStats}${prefixTicket}/type-seat`, {
      params,
    });
    return data;
  },
};
