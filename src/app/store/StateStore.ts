import { create } from "zustand";
import { State } from "../interfaces/State";

type Store = {
  states: State[];
  add_all_state: () => void;
  add: (newState: State) => void;
  remove: (stateId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  states: [],
  add_all_state: async () => {
    const states = await fetch("http://localhost:9000/api/v1/state").then(
      (res) => res.json()
    );
    set({ states });
  },
  add: (newState: State) =>
    set((state) => ({ states: [...state.states, newState] })),
  remove: (stateId: number) =>
    set((state) => ({
      states: state.states.filter((state) => state.id !== stateId),
    })),
}));
