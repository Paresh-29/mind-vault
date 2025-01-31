import express from "express";
import { connectDB } from "./lib/db";
import authRoutes from './routes/auth.route';
import contentRoute from './routes/content.route';
import shareRoute from './routes/share.route';
import cors from "cors";


const app = express();

app.use(express.json());
app.use(cors({
	origin: "http://localhost:5173", // Change to your frontend URL
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Authorization", "Content-Type"],
	credentials: true
}));



app.use("/api/v1/", authRoutes);
app.use("/api/v1/content", contentRoute);
app.use("/api/v1/brain", shareRoute);


app.listen(3000, () => {
	console.log("server listening on port 3000");
	connectDB();
});
