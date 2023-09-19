import { create } from "zustand";
import { User } from "../interfaces/User";

type Store = {
  users: User[];
  add_all_user: () => void;
  add: (newUser: User) => void;
  remove: (userId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  users: [],
  add_all_user: async () => {
    const users = await fetch("http://localhost:9000/api/v1/user/order").then((res) =>
      res.json()
    );
    set({ users });
  },
  add: (newUser: User) =>
    set((state) => ({ users: [...state.users, newUser] })),
  remove: (userId: number) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),
}));
