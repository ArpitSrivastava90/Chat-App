import express from "express";
import dotenv from "dotenv";
import AuthRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use("/api/auth", AuthRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
