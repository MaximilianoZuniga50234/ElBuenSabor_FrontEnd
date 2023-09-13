import { create } from "zustand";
import { Role } from "../interfaces/Role";

type Store = {
  roles: Role[];
  add_all_role: () => void;
  add: (newRole: Role) => void;
  remove: (roleId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  roles: [],
  add_all_role: async () => {
    const roles = await fetch("http://localhost:9000/api/v1/role").then((res) =>
      res.json()
    );
    set({ roles });
  },
  add: (newRole: Role) =>
    set((state) => ({ roles: [...state.roles, newRole] })),
  remove: (roleId: number) =>
    set((state) => ({
      roles: state.roles.filter((role) => role.id !== roleId),
    })),
}));
