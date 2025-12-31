import {
  CalendarOutlined,
  ClockCircleOutlined,
  DesktopOutlined,
  PoundOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";
import { QUERYKEY } from "../../../../common/constants/queryKey";
import { ticketStats } from "../../../../common/services/stats.service";
import { useTableHook } from "../../../../common/hooks/useTableHook";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import FilterStatsTicket from "./components/FilterStatsTicket";
import TicketHourlyTrendChart from "./components/TicketHourlyChart";
import TopMovieChart from "./components/TopMovieChart";
import SeatTypeChart from "./components/SeatTypeChart";
import TicketHourlyTodayChart from "./components/TicketTodayChart";
dayjs.extend(utc);
const StatsTicket = () => {
  const { query: overviewTicketQuery } = useTableHook("overviewTicket");
  const { data } = useQuery({
    queryKey: [QUERYKEY.STATS, QUERYKEY.STATS.TICKET, overviewTicketQuery],
    queryFn: () => ticketStats.getOverviewStatsTicket(overviewTicketQuery),
  });
  return (
    <div className="bg-[#121822] w-full min-h-[70dvh] rounded-md px-6 py-4">
      <p className="text-lg font-semibold mb-4">Thống kê vé</p>
      <div className="my-4">
        <FilterStatsTicket />
      </div>
      <div className="grid grid-cols-4 gap-6">
        <Card variant="borderless">
          <div className="flex items-center gap-4">
            <PoundOutlined className="text-xl" />
            <div>
              <p className="text-gray-300/50">Tổng vé bán ra</p>
              <p className="text-lg">{data?.data.totalTickets || 0}</p>
            </div>
          </div>
        </Card>
        <Card variant="borderless">
          <div className="flex items-center gap-4">
            <CalendarOutlined className="text-xl" />
            <div>
              <p className="text-gray-300/50">Trung bình mỗi ngày</p>
              <p className="text-lg">{data?.data.avgTicketsPerDay || 0}</p>
            </div>
          </div>
        </Card>
        <Card variant="borderless">
          <div className="flex items-center gap-4">
            <ClockCircleOutlined className="text-xl" />
            <div>
              <p className="text-gray-300/50">Giờ cao điểm</p>
              <p className="text-lg">
                {data?.data?.peakHour?.hour
                  ? dayjs
                      .utc(data?.data.peakHour.hour, "HH:mm")
                      .add(7, "hour")
                      .format("HH:mm")
                  : "Chưa có dữ liệu"}
              </p>
            </div>
          </div>
        </Card>
        <Card variant="borderless">
          <div className="flex items-center gap-4">
            <DesktopOutlined className="text-xl" />
            <div>
              <p className="text-gray-300/50">Phòng chiếu bán nhiều</p>
              <p className="text-lg">
                {data?.data.topRoom ? data.data.topRoom : "Chưa có dữ liệu"}
              </p>
            </div>
          </div>
        </Card>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6">
        <Card
          title={
            <div className="flex items-center justify-between">
              <p>Xu hướng bán vé</p>
              <p className="text-xs text-gray-300/50">
                Các giờ được mua nhiều nhất
              </p>
            </div>
          }
        >
          <TicketHourlyTrendChart />
        </Card>
        <Card
          title={
            <div className="flex items-center justify-between">
              <p>Top phim bán chạy nhất</p>
              <p className="text-xs text-gray-300/50">Phim bán chay nhất</p>
            </div>
          }
        >
          <TopMovieChart />
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        <Card
          title={
            <div className="flex items-center justify-between">
              <p>Phân loại vé</p>
              <p className="text-xs text-gray-300/50">Phân bố theo loại vé</p>
            </div>
          }
        >
          <SeatTypeChart />
        </Card>
        <Card
          title={
            <div className="flex items-center justify-between">
              <p>Giờ cao điểm</p>
              <p className="text-xs text-gray-300/50">
                Số lượng vé bán ra theo giờ trong hôm nay
              </p>
            </div>
          }
        >
          <TicketHourlyTodayChart />
        </Card>
      </div>
    </div>
  );
};

export default StatsTicket;
