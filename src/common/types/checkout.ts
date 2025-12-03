export interface ISeatItemCheckout {
  seatLabel: string;
  price: number;
  type: string;
}
export interface IPayloadCheckout {
  showtimeId: string | undefined;
  customerInfo: {
    userName: string;
    phone: string;
    email: string;
  };
  movieId: string | undefined;
  roomId: string | undefined;
  roomName: string | undefined;
  movieName: string | undefined;
  items: ISeatItemCheckout[];
  startTime: string | undefined;
  qrCode: string;
  totalPrice: number;
}
