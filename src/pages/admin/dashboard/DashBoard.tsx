import {
  BankOutlined,
  ContainerOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Card, Select } from "antd";
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
    </div>
  );
};

export default DashBoard;
