import { create } from "zustand";
import { User } from "../interfaces/User";

type Store = {
  users: User[];
  add: (newUser: User) => void;
  remove: (userId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  users: [],
  add: (newUser: User) =>
    set((state) => ({ users: [...state.users, newUser] })),
  remove: (userId: number) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),
}));
