import express from "express";
import { connectDB } from "./lib/db";
import authRoutes from './routes/auth.route';

const app = express();

app.use(express.json());



app.use("/api/auth", authRoutes);


app.listen(3000, () => {
  console.log("server listening on port 3000");
  connectDB();
});
