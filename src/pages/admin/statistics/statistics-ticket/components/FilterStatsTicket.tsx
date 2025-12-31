import { DatePicker, Form } from "antd";
import dayjs from "dayjs";
import { useTableHook } from "../../../../../common/hooks/useTableHook";

const { RangePicker } = DatePicker;
const FilterStatsTicket = () => {
  const { query, onFilter } = useTableHook("overviewTicket");
  return (
    <div>
      <Form.Item label="Lọc theo khoảng ngày" layout="vertical" required>
        <RangePicker
          defaultValue={
            query.createdAtFrom && query.createdAtTo
              ? [dayjs(query.createdAtFrom), dayjs(query.createdAtTo)]
              : [dayjs().startOf("month"), dayjs().endOf("month")]
          }
          onChange={(dates) => {
            if (!dates) {
              onFilter({
                createdAtFrom: null,
                createdAtTo: null,
                quickFilter: null,
              });
              return;
            }
            const [from, to] = dates;
            onFilter({
              createdAtFrom: from ? [from.startOf("day").toISOString()] : null,
              createdAtTo: to ? [to.endOf("day").toISOString()] : null,
              quickFilter: null,
            });
          }}
          allowClear={false}
          placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
          format="DD/MM/YYYY"
        />
      </Form.Item>
    </div>
  );
};

export default FilterStatsTicket;
