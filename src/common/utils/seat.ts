import { seatTypeColor } from "../constants";
import { SEAT_STATUS, SEAT_STATUS_COLOR } from "../constants/seat";
import type { ISeat } from "../types/seat";

export function generatePreviewSeats(
  totalSeats = 140,
  cols = 14,
): {
  cols: number;
  rows: number;
  totalSeats: number;
  seats: Omit<ISeat, "_id" | "roomId">[];
} {
  const seats: Omit<ISeat, "_id" | "roomId">[] = [];
  const rows = Math.ceil(totalSeats / cols);
  const coupleRow = rows;
  const vipStartRow = Math.floor(rows / 2);
  const vipEndRow = coupleRow - 1;
  let seatCount = 0;
  for (let row = 1; row <= rows; row++) {
    let typeRow: "NORMAL" | "VIP" | "COUPLE" = "NORMAL";
    if (row === coupleRow) {
      typeRow = "COUPLE";
    } else if (row >= vipStartRow && row <= vipEndRow) {
      typeRow = "VIP";
    }
    for (let col = 1; col <= cols; col++) {
      let type: "NORMAL" | "VIP" | "COUPLE" = typeRow;
      let span = 1;
      if (type === "COUPLE") {
        span = 2;
      }
      if (type === "VIP" && (col <= 2 || col > cols - 2)) {
        type = "NORMAL";
      }
      const seatLabel =
        type === "COUPLE"
          ? `${String.fromCharCode(64 + row)}${col}-${String.fromCharCode(
              64 + row,
            )}${col + 1}`
          : `${String.fromCharCode(64 + row)}${col}`;
      seats.push({
        row,
        col,
        label: seatLabel,
        type,
        span,
        status: true,
      });

      col += span - 1;
      seatCount += typeRow === "COUPLE" ? span - 1 : span;
    }
  }
  return {
    totalSeats: seatCount,
    rows,
    cols,
    seats,
  };
}

export const getStyleSeatCard = (seat: ISeat, color?: string) => {
  console.log(color);
  return {
    gridRowStart: seat.row,
    gridColumnStart: seat.col,
    gridColumnEnd: `span ${seat.span || 1}`,
    backgroundColor: seat.status
      ? color
        ? color
        : seatTypeColor[seat.type]
      : "#ef4444",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    cursor: "pointer",
  };
};

export const getStatusSeat = (status: string, isMyHold: boolean) => {
  if (status === SEAT_STATUS.HOLD && isMyHold) {
    return SEAT_STATUS_COLOR[SEAT_STATUS.MYHOLD];
  }
  if (status === SEAT_STATUS.BOOKED && isMyHold) {
    return SEAT_STATUS_COLOR[SEAT_STATUS.MYBOOKED];
  }
  switch (status) {
    case SEAT_STATUS.HOLD:
      return SEAT_STATUS_COLOR[SEAT_STATUS.HOLD];
    case SEAT_STATUS.BOOKED:
      return SEAT_STATUS_COLOR[SEAT_STATUS.BOOKED];
    default:
      return "";
  }
};
