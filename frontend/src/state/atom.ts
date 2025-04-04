import { atom } from "recoil";


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
