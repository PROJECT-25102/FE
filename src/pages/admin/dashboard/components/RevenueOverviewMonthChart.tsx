import Chart from "react-apexcharts";
import { useTableHook } from "../../../../common/hooks/useTableHook";
import { useQuery } from "@tanstack/react-query";
import { QUERYKEY } from "../../../../common/constants/queryKey";
import { statsOverview } from "../../../../common/services/stats.service";
import dayjs from "dayjs";

const RevenueOverviewMonthChart = () => {
  const { query } = useTableHook("monthYear");
  const { data, isLoading } = useQuery({
    queryKey: [QUERYKEY.STATS.OVERVIEW, "MONTH", query],
    queryFn: () => statsOverview.getOverviewByYear(query),
  });
  const result = data?.data?.result ?? [];
  const series = [
    {
      name: "Doanh thu",
      type: "line",
      data: result.map((item) => ({
        x: dayjs(item.month).format("[Tháng] MM - YYYY"),
        y: item.revenue,
      })),
    },
    {
      name: "Đơn vé",
      type: "line",
      data: result.map((item) => ({
        x: dayjs(item.month).format("[Tháng] MM - YYYY"),
        y: item.tickets,
      })),
    },
  ];
  const options: ApexCharts.ApexOptions = {
    theme: { mode: "dark" },
    chart: {
      type: "line",
      stacked: false,
      background: "transparent",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#22c55e", "#38bdf8"],
    stroke: {
      width: [1, 1],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 4,
      },
    },
    markers: {
      size: 5,
      strokeWidth: 2,
      strokeColors: "#0b0f14",
    },
    yaxis: [
      {
        title: { text: "Doanh thu" },
        labels: {
          style: { colors: "#9ca3af" },
          formatter: (v: number) => {
            if (v >= 1_000_000_000) {
              return `${(v / 1_000_000_000).toFixed(1)}B ₫`;
            }
            if (v >= 1_000_000) {
              return `${(v / 1_000_000).toFixed(0)}M ₫`;
            }
            if (v >= 1_000) {
              return `${(v / 1_000).toFixed(0)}K ₫`;
            }
            return `${v.toLocaleString("vi-VN")} ₫`;
          },
        },
      },
      {
        opposite: true,
        title: { text: "Đơn vé" },
        labels: {
          style: { colors: "#9ca3af" },
          formatter: (v) => `${v}`,
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      theme: "dark",
      y: [
        {
          formatter: (v) => v.toLocaleString("vi-VN") + " ₫",
        },
        {
          formatter: (v) => `${v} vé`,
        },
      ],
    },
    xaxis: {
      labels: { style: { colors: "#9ca3af" } },
      axisBorder: { color: "#374151" },
      axisTicks: { color: "#374151" },
    },
    grid: {
      borderColor: "#1f2937",
      strokeDashArray: 3,
    },
    dataLabels: { enabled: false },
  };

  return !isLoading && <Chart options={options} series={series} height={350} />;
};

export default RevenueOverviewMonthChart;
