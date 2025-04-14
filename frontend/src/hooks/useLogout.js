import { useSetRecoilState } from "recoil";
import { authState } from "../state/atom";
const useLogout = () => {
    const setAuth = useSetRecoilState(authState);
    const logout = () => {
        localStorage.removeItem("token"); // removing token from localStorage
        setAuth({
            isAuthenticated: false,
            token: null,
        });
    };
    return logout;
};
export default useLogout;
