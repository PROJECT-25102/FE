import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Popover } from "antd";
import { seatTypeColor } from "../../../../../common/constants";
import { QUERYKEY } from "../../../../../common/constants/queryKey";
import { useMessage } from "../../../../../common/hooks/useMessage";
import { updateStatusSeat } from "../../../../../common/services/seat.service";
import type { ISeat } from "../../../../../common/types/seat";

const SeatPopover = ({ seat }: { seat: ISeat }) => {
  const queryClient = useQueryClient();
  const { antdMessage, HandleError } = useMessage();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => updateStatusSeat(id),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes(QUERYKEY.SEAT),
      });
    },
    onError: (err) => HandleError(err),
  });
  return (
    <Popover
      placement="bottom"
      trigger="click"
      content={
        <div className="flex flex-col gap-2 justify-center items-center px-2">
          <p>Chi tiết ghế {seat.label}</p>
          <Button
            loading={isPending}
            onClick={() => mutate(seat._id)}
            danger={seat.status}
            icon={seat.status ? <LockOutlined /> : <UnlockOutlined />}
          >
            {seat.status ? "Khoá ghế" : "Mở khoá"}
          </Button>
        </div>
      }
    >
      <div
        style={{
          gridRowStart: seat.row,
          gridColumnStart: seat.col,
          gridColumnEnd: `span ${seat.span || 1}`,
          backgroundColor: seat.status ? seatTypeColor[seat.type] : "#ef4444",
          borderRadius: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          cursor: "pointer",
        }}
        title={seat.label}
      >
        {seat.label}
      </div>
    </Popover>
  );
};

export default SeatPopover;
