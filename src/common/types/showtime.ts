import type { IMovie } from "./movie";
import type { IRoom } from "./room";

export interface IMovieHasShowtime extends IMovie {
  showtimeCount: number;
  firstStartTime: string;
  lastStartTime: string;
  dayOfWeeks: number[];
}

export interface IPriceShowTime {
  seatType: string;
  value: number;
  _id: string;
}

export type IShowtimeStatus =
  | "scheduled"
  | "sold_out"
  | "in_progress"
  | "ended"
  | "cancelled";

export interface IShowtime {
  _id: string;
  movieId: IMovie;
  roomId: IRoom;
  startTime: string;
  dayOfWeek: number;
  endTime: string;
  price: IPriceShowTime[];
  status: IShowtimeStatus;
  createdAt?: string;
  updatedAt: string;
}

export interface IWeekdayShowtime {
  [key: string]: IShowtime[];
}
