import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
export const authState = atom({
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
export const themeState = atom({
    key: "themeState",
    default: "light",
    effects_UNSTABLE: [persistAtom],
});
