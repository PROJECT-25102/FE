export interface IOverviewStats {
  ticket: {
    total: number;
    previous: number;
    growth: number;
  };
  revenue: {
    total: number;
    previous: number;
    growth: number;
  };
  newUser: {
    total: number;
    previous: number;
    growth: number;
  };
}

export interface IOverviewStatsYearResult {
  month: string;
  revenue: number;
  tickets: number;
}

export interface IOverviewStatsYear {
  year: string;
  result: IOverviewStatsYearResult[];
}
