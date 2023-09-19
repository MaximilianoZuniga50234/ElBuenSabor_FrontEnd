import { create } from "zustand";
import { Address } from "../interfaces/Address";

type Store = {
  addresses: Address[];
  add_all_address: () => void;
  add: (newAddress: Address) => void;
  remove: (addressId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  addresses: [],
  add_all_address: async () => {
    const addresses = await fetch("http://localhost:9000/api/v1/address").then(
      (res) => res.json()
    );
    set({ addresses });
  },
  add: (newAddress: Address) =>
    set((state) => ({ addresses: [...state.addresses, newAddress] })),
  remove: (addressId: number) =>
    set((state) => ({
      addresses: state.addresses.filter((address) => address.id !== addressId),
    })),
}));
