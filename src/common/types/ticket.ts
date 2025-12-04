export type TicketStatusEnum = ["PENDING", "CONFIRMED", "CANCELLED"];

export interface ITicketItem {
  seatId: string;
  seatLabel: string;
  price: number;
  type: string;
}

export interface ICustomerInfo {
  userName: string;
  phone: string;
}

export interface ITicket {
  _id: string;
  userId: string;
  showtimeId: string;
  status: TicketStatusEnum;
  customerInfo: ICustomerInfo;
  movieId: string;
  movieName: string;
  roomId: string;
  roomName: string;
  items: ITicketItem[];
  startTime: string;
  qrCode: string;
  totalPrice: number;
  isPaid: boolean;
  cancelDescription?: string;
  createdAt: string;
  updatedAt: string;
}
