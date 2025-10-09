import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import AuthRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDb } from "./lib/db.js";
import cookieParser from "cookie-parser";
import { ENV } from "./lib/env.js";
dotenv.config();

const app = express();
const __dirname = path.resolve(); // C:\Web development\Projects - 1\chatapp\backend

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", AuthRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDb().then(() => {
    console.log(`Your server is running on port ${PORT}`);
  });
});
