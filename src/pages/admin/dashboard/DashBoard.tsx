import {
  BankOutlined,
  ContainerOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Card, Image, Select, Spin } from "antd";
import { useState } from "react";
import { QUERYKEY } from "../../../common/constants/queryKey";
import { useTableHook } from "../../../common/hooks/useTableHook";
import { statsOverview } from "../../../common/services/stats.service";
import type { IOverviewStats } from "../../../common/types/stats";
import { formatCurrency, getGrowthColor } from "../../../common/utils";
import FilterOverviewCard from "./components/FilterOverviewCard";
import RevenueOverviewMonthChart from "./components/RevenueOverviewMonthChart";
import dayjs from "dayjs";

const LABEL_FILTER: Record<string, string> = {
  today: "hôm qua",
  dayAgo: `${dayjs().subtract(2, "day").format("DD/MM/YYYY")}`,
  weekAge: "7 ngày trước đó",
  monthAgo: "30 ngày trước đó",
  thisYear: "Năm trước",
};

const DashBoard = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const { query: overviewQuery } = useTableHook("overviewCard");
  const { onFilter } = useTableHook("monthYear");
  const overviewServer = useQuery({
    queryKey: [QUERYKEY.STATS.OVERVIEW, overviewQuery],
    queryFn: () => statsOverview.getOverviewStats(overviewQuery),
  });
  const topMovieServer = useQuery({
    queryKey: [QUERYKEY.STATS.OVERVIEW, "TOP_MOVIES", overviewQuery],
    queryFn: () => statsOverview.getTrendMovies(overviewQuery),
  });
  const yearOptions = Array.from({ length: 5 }, (_, i) => ({
    label: `Năm ${currentYear - i}`,
    value: currentYear - i,
  }));
  const overviewData = overviewServer.data?.data || ({} as IOverviewStats);
  return (
    <div className="bg-[#121822] w-full min-h-[70dvh] rounded-md px-6 py-4">
      <p className="text-lg font-semibold mb-4">Tổng quan hệ thống</p>
      <FilterOverviewCard />
      {!overviewServer.isLoading && (
        <div className="grid grid-cols-3 gap-6 mt-4">
          <Card variant="borderless">
            <p className="text-gray-300/50 mb-2 flex items-center gap-2">
              <BankOutlined /> Doanh thu
            </p>
            <p className="text-xl font-semibold mb-2 ">
              {formatCurrency(overviewData.revenue.total)}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-gray-300/50">
                So với{" "}
                {LABEL_FILTER[overviewQuery.quickFilter] || "tháng trước"}
              </p>
              <p
                className={`${getGrowthColor(overviewData.revenue.growth)} text-base`}
              >
                {overviewData.revenue.growth}%
              </p>
            </div>
          </Card>
          <Card variant="borderless">
            <p className="text-gray-300/50 mb-2 flex items-center gap-2">
              <ContainerOutlined />
              Đơn vé
            </p>
            <p className="text-xl font-semibold mb-2 ">
              {overviewData.ticket.total} Vé
            </p>
            <div className="flex items-center justify-between">
              <p className="text-gray-300/50">
                So với {LABEL_FILTER[overviewQuery.quickFilter]}
              </p>
              <p
                className={`${getGrowthColor(overviewData.ticket.growth)} text-base`}
              >
                {overviewData.ticket.growth}%
              </p>
            </div>
          </Card>
          <Card variant="borderless">
            <p className="text-gray-300/50 mb-2 flex items-center gap-2">
              <TeamOutlined />
              Người dùng mới
            </p>
            <p className="text-xl font-semibold mb-2 ">
              {overviewData.newUser.total}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-gray-300/50">
                So với{" "}
                {LABEL_FILTER[overviewQuery.quickFilter] || "tháng trước"}
              </p>
              <p
                className={`${getGrowthColor(overviewData.newUser.growth)} text-base`}
              >
                {overviewData.newUser.growth}%
              </p>
            </div>
          </Card>
        </div>
      )}
      <div className="mt-4">
        <p className="text-lg font-semibold mb-4">Doanh thu và vé trong năm</p>
        <div className="flex justify-end">
          <Select
            value={year}
            options={yearOptions}
            onChange={(e) => {
              setYear(e);
              onFilter({ year: [e] });
              console.log(e);
            }}
            style={{ width: 120 }}
            size="middle"
          />
        </div>
        <RevenueOverviewMonthChart />
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-semibold">Top 5 phim bán chạy nhất</p>
          <p className="text-gray-300/50">
            Dữ liệu được tính theo bộ lọc tổng quan hiện tại
          </p>
        </div>
        {topMovieServer.isLoading && (
          <div className="min-h-[350px] flex items-center justify-center">
            <Spin />
          </div>
        )}
        {!topMovieServer.isLoading && (
          <>
            {topMovieServer.data?.data.result.length !== 0 ? (
              <div
                className="grid min-h-[200px] gap-4"
                style={{
                  gridTemplateColumns: `repeat(${topMovieServer.data?.data.result.length}, 1fr)`,
                }}
              >
                {topMovieServer?.data?.data.result.map((item, index) => (
                  <Card key={index}>
                    <div className="flex items-start gap-4">
                      <Image
                        src={
                          item.poster ||
                          "https://i.pinimg.com/736x/db/ef/1c/dbef1c654afc5ce415517725b1217099.jpg"
                        }
                        style={{
                          height: 150,
                          width: 100,
                          borderRadius: 5,
                          overflow: "hidden",
                        }}
                      />
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold text-lg line-clamp-1">
                          {item.movieName}
                        </p>
                        <p className="line-clamp-1">
                          Doanh thu:{" "}
                          <span className="font-semibold">
                            {formatCurrency(item.revenue)}
                          </span>
                        </p>
                        <p className="line-clamp-1">
                          Số vé bán ra:{" "}
                          <span className="font-semibold">
                            {item.totalTickets}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex min-h-[200px]  justify-center items-center gap-4">
                <p className="text-gray-300/50">Chưa có dữ liệu</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
