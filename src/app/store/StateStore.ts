import { create } from "zustand";
import { State } from "../interfaces/State";

type Store = {
  states: State[];
  add: (newState: State) => void;
  remove: (stateId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  states: [],
  add: (newState: State) =>
    set((state) => ({ states: [...state.states, newState] })),
  remove: (stateId: number) =>
    set((state) => ({
      states: state.states.filter((state) => state.id !== stateId),
    })),
}));
