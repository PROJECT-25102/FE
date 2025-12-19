import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useTableHook } from "../../../../common/hooks/useTableHook";
import { useEffect, useState } from "react";

const { RangePicker } = DatePicker;

const FilterOverviewCard = () => {
  const { query, onFilter } = useTableHook("overviewCard");
  const [selectQuickFilter, setSelectQuickFilter] = useState<string | null>("");
  const applyRange = (from: dayjs.Dayjs, to: dayjs.Dayjs) => {
    onFilter({
      createdAtFrom: [from.startOf("day").toISOString()],
      createdAtTo: [to.endOf("day").toISOString()],
      quickFilter: null,
    });
  };

  const handleCustomRange = (dates: any) => {
    if (!dates) onFilter({ createdAtFrom: null, createdAtTo: null });
    const [from, to] = dates;
    applyRange(from, to);
    setSelectQuickFilter(null);
  };

  useEffect(() => {
    setSelectQuickFilter(query.quickFilter ?? "thisMonth");
  }, [query.quickFilter]);
  return (
    <div className="flex items-center gap-4">
      <Select
        placeholder="Chọn nhanh"
        style={{ width: 160 }}
        value={selectQuickFilter}
        onChange={(e) => {
          onFilter({ quickFilter: e === "thisMonth" ? null : [e] });
          setSelectQuickFilter(e);
        }}
        options={[
          { label: "Tháng này", value: "thisMonth" },
          { label: "Hôm nay", value: "today" },
          { label: "Hôm qua", value: "dayAgo" },
          { label: "7 ngày qua", value: "weekAgo" },
          { label: "30 ngày qua", value: "monthAgo" },
          { label: "Năm nay", value: "thisYear" },
        ]}
      />
      <RangePicker
        allowClear
        onChange={(e) => {
          handleCustomRange(e);
        }}
        placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
        format="DD/MM/YYYY"
      />
    </div>
  );
};

export default FilterOverviewCard;
