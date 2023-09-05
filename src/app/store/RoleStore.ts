import { create } from "zustand";
import { Role } from "../interfaces/Role";

type Store = {
  roles: Role[];
  add: (newRole: Role) => void;
  remove: (roleId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  roles: [],
  add: (newRole: Role) =>
    set((state) => ({ roles: [...state.roles, newRole] })),
  remove: (roleId: number) =>
    set((state) => ({
      roles: state.roles.filter((role) => role.id !== roleId),
    })),
}));
