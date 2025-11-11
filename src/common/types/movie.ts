import type { ICategory } from "./category";

export interface IMovie {
  _id: string;
  name: string;
  description?: string;
  poster: string;
  category: string[] | ICategory[];
  trailer?: string;
  actor: string[];
  director: string;
  rating: number;
  ageRequire: "P" | "K" | "C13" | "C16" | "C18";
  duration: number;
  statusRelease: "upcoming" | "nowShowing" | "released";
  releaseDate: string;
  endDate: string;
  isFeatured: boolean;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}
