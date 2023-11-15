import { create } from "zustand";
import { Status } from "../../interfaces/Status";

type Store = {
  statuses: Status[];
  add_all_status: () => void;
  add: (newStatus: Status) => void;
  remove: (statusId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  statuses: [],
  add_all_status: async () => {
    const statuses = await fetch("http://localhost:9000/api/v1/status").then(
      (res) => res.json()
    );
    set({ statuses });
  },
  add: (newStatus: Status) =>
    set((state) => ({ statuses: [...state.statuses, newStatus] })),
  remove: (statusId: number) =>
    set((state) => ({
      statuses: state.statuses.filter((status) => status.id !== statusId),
    })),
}));
