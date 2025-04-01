import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { SidebarUser } from "../Types/AuthUser";

interface useMessageStoreType {
  messages: any[];
  users: SidebarUser[];
  selectedUser: SidebarUser | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser: (selectedUser: SidebarUser) => void;
}

export const useMessageStore = create<useMessageStoreType>((set) => ({
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

  setSelectedUser: (selectedUser: SidebarUser) => {
    set({ selectedUser });
  },
}));
