import type { IMovie } from "./movie";

export interface ISeat {
  _id: string;
  roomId: string | IMovie;
  label: string;
  col: number;
  row: number;
  span: number;
  type: "NORMAL" | "VIP" | "COUPLE";
  status: boolean;
}
