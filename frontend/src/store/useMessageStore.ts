import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Message, SidebarUser } from "../Types/AuthUser";
import { useAuthStore } from "./useAuthStore";

interface useMessageStoreType {
  messages: Message[];
  users: SidebarUser[];
  selectedUser: SidebarUser | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser: (selectedUser: SidebarUser | null) => void;
  sendMessage: (messageData: {
    message: string;
    image: string | null;
  }) => Promise<void>;
  viewMessages: (userId: string) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
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

  sendMessage: async (messageData: {
    message: string;
    image: string | null;
  }) => {
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

  viewMessages: async (recieverId: string) => {
    try {
      await axiosInstance.post(
        `/messages/view/${recieverId}`
      );
      const updatedUsers = get().users.map((user) =>
        user._id === recieverId
          ? { ...user, unreadMessageCount: 0 }
          : user
      );
      set({ users: updatedUsers });
      
    } catch (error) {
      console.error("Error viewing messages:", error);
      toast.error("Error viewing messages");
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;

    socket?.on("newMessage", (newMessage: Message) => {
      const currentUsers = get().users;
      const updatedUsers = currentUsers.map((user) =>
        user._id === newMessage.senderId
      ? { ...user, unreadMessageCount: user.unreadMessageCount + 1 }
      : user
    );
      set({ users: updatedUsers });

      const selectedUser = get().selectedUser;
      if (selectedUser && selectedUser._id === newMessage.senderId) {
        const currentMessages = get().messages;
        set({ messages: [...currentMessages, newMessage] });
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
  },

  setSelectedUser: (selectedUser: SidebarUser | null) => {
    set({ selectedUser });
  },
}));
