import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddlware } from "./utlis.js";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});

io.use(socketAuthMiddlware);

// for online user
const useSocketMap = {};

io.on("connection", (socket) => {
  console.log(" A user connected", socket.user.fullName);
  const userId = socket.userId;
  useSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(useSocketMap));
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);
    delete useSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(useSocketMap));
  });
});

export { io, app, server };
