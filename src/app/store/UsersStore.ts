import { UserAuth0Get } from "../interfaces/UserAuth0";
import { create } from "zustand";

type Store = {
  users: UserAuth0Get[];
  setUsers: (users: UserAuth0Get[]) => void;
};

export const useStore = create<Store>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));
