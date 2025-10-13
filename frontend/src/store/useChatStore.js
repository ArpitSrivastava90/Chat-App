import { create } from "zustand";
import { axiosIntsace } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
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

  getMessageByUserId: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosIntsace.get(`/messages/${userId}`);
      set({ messages: res.data.message });
    } catch (error) {
      console.error("Error at the getting Message");
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    const { authUser } = useAuthStore.getState();

    const tempId = ` temp-${Date.now()}`;
    // Imp one 
    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    // Immedaitely updates the UI after sending the msg
    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await axiosIntsace.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      // Assuming the API returns the new message in res.data
      const newMessage = res.data;

      // Append the new message to the existing messages array
      set({ messages: [...messages, newMessage] });
    } catch (error) {
      // if it fails immdiatly remove from the UI
      set({ messages: messages });
      console.error("Error sending message:", error);
    }
  },
}));
