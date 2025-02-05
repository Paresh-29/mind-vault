import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../state/atom";
import { apiWithoutAuth } from "../utils/axios";



export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const setAuth = useSetRecoilState(authState);

    const handleSignin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await apiWithoutAuth.post("/signin", { username, password });

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem("token", token);

                setAuth({ isAuthenticated: true, token });
                navigate("/");
            }
        } catch (error: any) {
            setError(error.response?.data?.message || "signin failed");
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold">Sign in</h2>
            <form onSubmit={handleSignin} className="w-1/3 bg-white p-6 shadow-md">
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="text"
                    placeholder="username"
                    className="border p-2 w-full mt-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    className="border p-2 w-full mt-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="bg-green-500 text-white p-2 mt-4 w-full">
                    Sign in
                </button>
            </form>
            <div className="mt-4 text-sm text-gray-600">
                <p>Don't have an account? {" "}
                    <button className="underline" onClick={() => navigate("/signup")}>
                        signup
                    </button>
                </p>
            </div>
        </div>
    )
}
