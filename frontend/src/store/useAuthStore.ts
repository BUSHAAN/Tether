import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { User, SignupUser } from "../Types/AuthUser";

interface useAuthStoreType {
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<useAuthStoreType>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (userData:SignupUser) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", userData);
      set({ authUser: response.data });
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      set({ isSigningUp: false });
    }
  }

}));
