import { create } from "zustand";
import { axiosIntsace } from "../lib/axios";
export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessageLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) ?? true,

  toggleSound: () => {
    const current = get().isSoundEnabled;
    const next = !current;

    localStorage.setItem("isSoundEnabled", JSON.stringify(next));

    set({ isSoundEnabled: next });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosIntsace.get("/messages/contacts");

      set({ allContacts: res.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosIntsace.get("/messages/chats");
      console.log("getMyChatPatners", res.data);
      set({ chats: res.data });
    } catch (error) {
      console.error("error in getting chat", error);
    } finally {
      set({ isUsersLoading: false });
    }
  },
}));
