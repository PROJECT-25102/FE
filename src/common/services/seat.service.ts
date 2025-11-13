import api from "../utils/api";

export const updateStatusSeat = async (seatId: string) => {
  const { data } = await api.patch(`/seat/status/${seatId}`);
  return data;
};
