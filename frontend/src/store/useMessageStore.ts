import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Message, SidebarUser } from "../Types/AuthUser";

interface useMessageStoreType {
  messages: Message[];
  users: SidebarUser[];
  selectedUser: SidebarUser | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser: (selectedUser: SidebarUser | null) => void;
  sendMessage: (messageData: { message: string; image: string|null }) => Promise<void>;
}

export const useMessageStore = create<useMessageStoreType>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    try {
      set({ isUsersLoading: true });
      const response = await axiosInstance.get("/messages/get-users");
      set({ users: response.data });
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    try {
      set({ isMessagesLoading: true });
      const response = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: response.data });
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Error fetching messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData: { message: string; image: string|null }) => {
    const { selectedUser, messages } = get();
    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser?._id}`,
        { ...messageData }
      );
      set({ messages: [...messages, response.data] });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Error sending message");
    }
  },
  setSelectedUser: (selectedUser: SidebarUser | null) => {
    set({ selectedUser });
  },
}));
