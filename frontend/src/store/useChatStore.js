import { create } from "zustand";
import { axiosIntsace } from "../lib/axios";
export const useChatStore = create(({ set, get }) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessageLoading: false,
  isSoundEnabled: localStorage.getItem("isSoundEnable") === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnable", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
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
      set({ chats: res.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isUsersLoading: false });
    }
  },
}));
