import { create } from "zustand";
import { axiosIntsace } from "../lib/axios.js";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isLoggedIn: false,
  isSigningUp: false,
  isLogingOut: false,
  isLogingIn: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosIntsace.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("Error in Auth Check:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosIntsace.post("/auth/signup", data);
      console.log("Response", res.data);

      set({ authUser: res.data });
      get().connectSocket();
      set({ isLoggedIn: true });
    } catch (error) {
      console.log("Error in signup", error);
      set({ authUser: null });
      set({ isLoggedIn: false });
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    set({ isLogingOut: true });
    try {
      await axiosIntsace.post("/auth/logout");
      set({ authUser: null });
      set({ isLoggedIn: false });
      get().disconnectSocket();
    } catch (error) {
      console.log("Error at logout", error);
    }
  },

  login: async (data) => {
    set({ isLogingIn: true });
    try {
      const res = await axiosIntsace.post("/auth/login", data);
      set({ authUser: res.data });
      set({ isLoggedIn: true });
      get().connectSocket();
    } catch (error) {
      console.log("Error at loginin", error);
      set({ authUser: null });
      set({ isLoggedIn: false });
    } finally {
      set({ isLogingIn: false });
    }
  },

  updateprofile: async (data) => {
    try {
      const res = await axiosIntsace.put("/auth/update-profile", data);
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error at the updating profile", error);
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true,
    });

    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket && socket.connected) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
