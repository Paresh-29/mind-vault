import express from "express";
import { connectDB } from "./lib/db";
import authRoutes from './routes/auth.route';
import contentRoute from './routes/content.route';
import shareRoute from './routes/share.route';


const app = express();

app.use(express.json());



app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/content", contentRoute);
app.use("/api/v1/brain", shareRoute);


app.listen(3000, () => {
  console.log("server listening on port 3000");
  connectDB();
});
