import { create } from "zustand";
import { axiosIntsace } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isLoggedIn: false,
  isSigningUp: false,
  isLogingOut: false,
  isLogingIn: false,

  checkAuth: async () => {
    try {
      const res = await axiosIntsace.get("/auth/check");
      set({ authUser: res.data });
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
    } catch (error) {
      console.log("Error at loginin", error);
      set({ authUser: null });
      set({ isLoggedIn: false });
    } finally {
      set({ isLogingIn: false });
    }
  },
}));
