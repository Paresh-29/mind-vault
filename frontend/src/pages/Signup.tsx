import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

export const Signup = () => {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [success, setSuccess] = useState("");
const navigate = useNavigate();

const handleSignup = async (e: React.FormEvent) => {
e.preventDefault();
setError("");
setSuccess("");

try {
const response = await api.post("/signup", { username, password });

if (response.status === 200) {
setSuccess("Signup successful! Redirecting to login...");
setTimeout(() => navigate("/signin"), 2000);
}
} catch (error: any) {
setError(error.response?.data?.message || "Signup failed");
}
};

return (
<div className="flex flex-col items-center justify-center min-h-screen">
	<h2 className="text-2xl font-bold">Sign Up</h2>
	<form onSubmit={handleSignup} className="w-1/3 bg-white p-6 shadow-md">
		{error && <p className="text-red-500">{error}</p>}
		{success && <p className="text-green-500">{success}</p>}
		<input type="text" placeholder="Username" className="border p-2 w-full mt-2" value={username} onChange={(e)=>
		setUsername(e.target.value)}
		/>
		<input type="password" placeholder="Password" className="border p-2 w-full mt-2" value={password}
			onChange={(e)=> setPassword(e.target.value)}
		/>
		<button type="submit" className="bg-blue-500 text-white p-2 mt-4 w-full">
			Sign Up
		</button>
	</form>
</div>
);
};
