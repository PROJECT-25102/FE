export interface IMovie {
  _id: string;
  name: string;
  description?: string;
  poster: string;
  category: string[];
  trailer?: string;
  actor: string[];
  director: string;
  rating: number;
  ageRequire: "P" | "K" | "C13" | "C16" | "C18";
  duration: number;
  releaseDate: string;
  isFeatured: boolean;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}
