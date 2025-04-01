import { create } from "zustand";

interface ThemeStoreType {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeStoreType>((set) => ({
  theme: localStorage.getItem("theme") || "dark",
  setTheme: (theme: string) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));
