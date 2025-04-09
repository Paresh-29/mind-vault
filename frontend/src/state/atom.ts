import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

export const authState = atom<AuthState>({
  key: "authState",
  default: {
    isAuthenticated: !!localStorage.getItem("token"),
    token: localStorage.getItem("token") || null,
  },
});

const { persistAtom } = recoilPersist({
  key: "theme-preference",
  storage: localStorage,
});

export type ThemeMode = "light" | "dark";

export const themeState = atom<ThemeMode>({
  key: "themeState",
  default: "light",
  effects_UNSTABLE: [persistAtom],
});
