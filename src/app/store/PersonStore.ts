import { create } from "zustand";
import { Person } from "../interfaces/Person";

type Store = {
  people: Person[];
  add_all_person: () => void;
  add: (newPerson: Person) => void;
  remove: (personId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  people: [],
  add_all_person: async () => {
    const people = await fetch("http://localhost:9000/api/v1/person").then(
      (res) => res.json()
    );
    set({ people });
  },
  add: (newPerson: Person) =>
    set((state) => ({ people: [...state.people, newPerson] })),
  remove: (personId: number) =>
    set((state) => ({
      people: state.people.filter((person) => person.id !== personId),
    })),
}));
