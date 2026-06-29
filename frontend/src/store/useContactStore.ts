import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useMessageStore } from "./useMessageStore";

interface SearchUser {
  _id: string;
  fullName: string;
  email: string;
  profilePic: string | "";
}

interface UseContactStoreType {
  searchResults: SearchUser[];
  isSearching: boolean;
  isAdding: boolean;
  searchUsers: (query: string) => Promise<void>;
  addContact: (contactId: string) => Promise<boolean>;
}

export const useContactStore = create<UseContactStoreType>((set) => ({
  searchResults: [],
  isSearching: false,
  isAdding: false,

  searchUsers: async (query: string) => {
    if (!query.trim()) {
      set({ searchResults: [] });
      return;
    }

    try {
      set({ isSearching: true });
      const response = await axiosInstance.get("/contacts/search", {
        params: { q: query },
      });
      set({ searchResults: response.data });
    } catch (error) {
      console.error("Error searching users:", error);
      toast.error("Error searching users");
    } finally {
      set({ isSearching: false });
    }
  },

  addContact: async (contactId: string) => {
    try {
      set({ isAdding: true });
      await axiosInstance.post("/contacts", { contactId });
      toast.success("Contact added");

      const selectedUser = useMessageStore.getState().selectedUser;

      await useMessageStore.getState().getUsers();

      if (selectedUser?._id === contactId) {
        const refreshedStore = useMessageStore.getState();
        const updatedUser = refreshedStore.users.find(
          (u) => u._id === contactId
        );
        if (updatedUser) {
          refreshedStore.setSelectedUser(updatedUser);
        }
      }

      return true;
    } catch (error) {
      console.error("Error adding contact:", error);
      toast.error("Error adding contact");
      return false;
    } finally {
      set({ isAdding: false });
    }
  },
}));
