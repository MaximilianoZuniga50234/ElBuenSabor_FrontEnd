import { UserAuth0Get } from "../interfaces/UserAuth0";
import { create } from "zustand";

type Store = {
  user: UserAuth0Get | null;
  setUser: (user: UserAuth0Get) => void;
};

export const useStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
