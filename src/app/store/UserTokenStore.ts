import { create } from "zustand";

type Store = {
  token: string;
  setToken: (token: string) => void;
};

export const useStore = create<Store>((set) => ({
  token: "",
  setToken: (token) => set({ token }),
}));
