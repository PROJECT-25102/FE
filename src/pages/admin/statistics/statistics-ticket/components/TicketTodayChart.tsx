import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Chart from "react-apexcharts";
import { QUERYKEY } from "../../../../../common/constants/queryKey";
import { ticketStats } from "../../../../../common/services/stats.service";

const TicketHourlyTodayChart = () => {
  const { data } = useQuery({
    queryKey: [QUERYKEY.STATS, QUERYKEY.STATS.TICKET, "HOUR_TODAY"],
    queryFn: () => ticketStats.getTicketTodayHourly(),
  });
  const chartData = data?.data.data.map((i: any) => ({
    hourLocal: dayjs.utc(`2025-01-01 ${i.hour}`).local().format("HH:mm"),
    totalTickets: i.totalTickets,
  }));

  const series: ApexAxisChartSeries = [
    {
      name: "Số vé bán ra",
      type: "area",
      data: chartData?.map((i) => i.totalTickets) || [],
    },
  ];
  const maxTickets = chartData
    ? Math.max(...chartData.map((i) => i.totalTickets), 0)
    : 0;

  const options: ApexCharts.ApexOptions = {
    theme: { mode: "dark" },
    chart: {
      type: "area",
      background: "transparent",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0.05,
      },
    },
    colors: ["#ef4444"],
    markers: {
      size: 4,
      strokeWidth: 2,
      strokeColors: "#0b0f14",
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: chartData?.map((i) => i.hourLocal),
      labels: { style: { colors: "#9ca3af" } },
      axisBorder: { color: "#374151" },
      axisTicks: { color: "#374151" },
    },
    yaxis: {
      min: 0,
      max: maxTickets <= 5 ? maxTickets + 2 : Math.ceil(maxTickets * 1.2),
      forceNiceScale: true,
      labels: {
        formatter: (v) => Math.round(v).toString(),
      },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (v) => `${v} vé`,
      },
    },
    grid: {
      borderColor: "#1f2937",
      strokeDashArray: 3,
    },
  };

  return <Chart options={options} series={series} height={350} />;
};

export default TicketHourlyTodayChart;
