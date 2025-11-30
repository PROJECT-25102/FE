import { SwapRightOutlined } from "@ant-design/icons";
import { TimePicker, Input } from "antd";
import { Dayjs } from "dayjs";
import { useState, useEffect } from "react";

interface DurationRangePickerProps {
  value?: [Dayjs | null, Dayjs | null];
  onChange?: (value: [Dayjs | null, Dayjs | null]) => void;
  durationMinutes?: number;
  placeholder?: [string, string];
  style?: React.CSSProperties;
  disabled?: boolean;
  disabledTime?: (date: Dayjs | null) => {
    disabledHours?: () => number[];
    disabledMinutes?: (hour: number) => number[];
  };
}

export const DurationRangePicker = ({
  value,
  onChange,
  durationMinutes = 2,
  placeholder = ["Bắt đầu", "Kết thúc"],
  style,
  disabled = false,
  disabledTime,
}: DurationRangePickerProps) => {
  const [startTime, setStartTime] = useState<Dayjs | null>(value?.[0] || null);
  const [endTime, setEndTime] = useState<Dayjs | null>(
    value?.[1] ||
      (value?.[0] ? value[0].add(durationMinutes, "minutes") : null),
  );

  useEffect(() => {
    if (value) {
      setStartTime(value[0]);
      setEndTime(
        value[1] ||
          (value[0] ? value[0].add(durationMinutes, "minutes") : null),
      );
    }
  }, [value, durationMinutes]);

  const handleStartChange = (time: Dayjs | null) => {
    const newEnd = time ? time.add(durationMinutes, "minutes") : null;
    setStartTime(time);
    setEndTime(newEnd);
    onChange?.([time, newEnd]);
  };

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <TimePicker
        format="HH:mm"
        showSecond={false}
        value={startTime}
        onChange={handleStartChange}
        placeholder={placeholder[0]}
        style={{ flex: 1, ...style }}
        disabled={disabled}
        disabledTime={disabledTime}
      />

      <SwapRightOutlined />

      <Input
        value={endTime ? endTime.format("HH:mm") : ""}
        placeholder={placeholder[1]}
        style={{ flex: 1 }}
        disabled
      />
    </div>
  );
};
