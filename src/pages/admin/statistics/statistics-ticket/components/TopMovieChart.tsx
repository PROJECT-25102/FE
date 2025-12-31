import Chart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { useTableHook } from "../../../../../common/hooks/useTableHook";
import { QUERYKEY } from "../../../../../common/constants/queryKey";
import { ticketStats } from "../../../../../common/services/stats.service";

const generateWheelColors = (count: number) => {
  const baseHue = 0;
  const hueRange = 70;
  const lightStart = 48;
  const lightEnd = 65;
  return Array.from({ length: count }).map((_, i) => {
    const hue =
      baseHue - hueRange / 2 + (hueRange / Math.max(count - 1, 1)) * i;
    const light =
      lightStart + ((lightEnd - lightStart) / Math.max(count - 1, 1)) * i;
    return `hsl(${(hue + 360) % 360}, 75%, ${light}%)`;
  });
};

const TopMovieChart = () => {
  const { query } = useTableHook("overviewTicket");
  const { data, isLoading } = useQuery({
    queryKey: [QUERYKEY.STATS, QUERYKEY.STATS.TICKET, "MOVIE", query],
    queryFn: () => ticketStats.getTopMovieTrend(query),
  });
  if (isLoading) return null;
  const chartData = data?.data?.data || [];
  const series = chartData.map((i) => i.totalTickets);
  const labels = chartData.map((i) => i.movieName);
  const colors = generateWheelColors(series.length);
  const options: ApexCharts.ApexOptions = {
    theme: { mode: "dark" },
    chart: {
      type: "pie",
      background: "transparent",
    },
    labels,
    colors,
    legend: {
      position: "bottom",
      labels: { colors: "#9ca3af" },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (v) => `${v} vé`,
      },
    },
    dataLabels: {
      formatter: (_, opts) => {
        const item = chartData[opts.seriesIndex];
        return `${item.percentage}%`;
      },
    },
    stroke: {
      width: 0,
    },
  };

  return <Chart options={options} series={series} type="pie" height={350} />;
};

export default TopMovieChart;
