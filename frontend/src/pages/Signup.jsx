import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiWithoutAuth } from "../utils/axios";
export const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const response = await apiWithoutAuth.post("/signup", {
                username,
                password,
            });
            if (response.status === 200) {
                setSuccess("Signup successful! Redirecting to login...");
                setTimeout(() => navigate("/signin"), 2000);
            }
        }
        catch (error) {
            setError(error.response?.data?.message || "Signup failed");
        }
    };
    return (<div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSignup}>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <input type="text" placeholder="Username" className="border border-gray-300 p-3 w-full mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input type="password" placeholder="Password" className="border border-gray-300 p-3 w-full mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600  text-white font-semibold p-3 mt-4 w-full rounded-md transition duration-200">
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center text-gray-600">
          <p>
            Already hav an account?{" "}
            <button onClick={() => navigate("/signin")} className="text-blue-500 hover:underline">
              Login Here
            </button>
          </p>
        </div>
      </div>
    </div>);
};
