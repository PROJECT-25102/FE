import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useShallow } from "zustand/shallow";
import type { IUser } from "../types/user";

interface AuthState {
  user: IUser | null;
  token: string | null;
  login: (user: IUser | null, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        login: (user, token) => set({ user, token }),
        logout: () => set({ user: null, token: null }),
      }),
      { name: "Auth" },
    ),
    { name: "Auth" },
  ),
);

export const useAuthSelector = <T>(selector: (state: AuthState) => T): T =>
  useAuthStore(useShallow(selector));
