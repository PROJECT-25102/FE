export interface IRoom {
  _id: string;
  name: string;
  description?: string;
  capacity: number;
  cols: number;
  rows: number;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}
