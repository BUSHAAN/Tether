import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { User, SignupUser } from "../Types/AuthUser";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface useAuthStoreType {
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  checkAuth: () => Promise<void>;
  signup: (userData: SignupUser) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<useAuthStoreType>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],

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

  signup: async (userData: SignupUser) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", userData);
      toast.success("Account created successfully");
      set({ authUser: response.data });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error signing up:", error);
        toast.error(error.response?.data?.message || "Error signing up");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async ({ email, password }: { email: string; password: string }) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      toast.success("Logged in successfully");
      set({ authUser: response.data });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error logging in:", error);
        toast.error(error.response?.data?.message || "Error logging in");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred while logging in");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error logging out:", error);
        toast.error(error.response?.data?.message || "Error logging out");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred while logging out");
      }
    }
  },

  updateProfile: async (userData: Partial<User>) => {
    try {
      set({ isUpdatingProfile: true });
      await axiosInstance.put("/auth/update-profile", userData);
      toast.success("Profile updated successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error updating profile:", error);
        toast.error(error.response?.data?.message || "Error updating profile");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred while updating profile");
      }
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
