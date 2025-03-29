import { useState } from "react";
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
      const response = await apiWithoutAuth.post("/signin", {
        username,
        password,
      });

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Sign in</h2>
        <form onSubmit={handleSignin} className="mt-4">
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="text"
            placeholder="username"
            className="border border-gray-300  p-3 w-full mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="border border-gray-300 p-3  w-full mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white p-3 mt-4 w-full rounded-md transition duration-200"
          >
            Sign in
          </button>
        </form>
        <div className="mt-4 text-center text-gray-600">
          <p>
            Don't have an account?{" "}
            <button
              className="text-green hover:underline"
              onClick={() => navigate("/signup")}
            >
              signup
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
