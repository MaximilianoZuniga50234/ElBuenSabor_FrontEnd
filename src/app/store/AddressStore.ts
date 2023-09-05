import { create } from "zustand";
import { Address } from "../interfaces/Address";

type Store = {
  addresses: Address[];
  add: (newAddress: Address) => void;
  remove: (addressId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  addresses: [],
  add: (newAddress: Address) =>
    set((state) => ({ addresses: [...state.addresses, newAddress] })),
  remove: (addressId: number) =>
    set((state) => ({
      addresses: state.addresses.filter((address) => address.id !== addressId),
    })),
}));
