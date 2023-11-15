import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../interfaces/Product";

type Store = {
  cartProducts: Product[];
};

type Actions = {
  add: (newProduct: Product) => void;
  remove: (productId: number) => void;
  clear: () => void;
};

export const useStore = create(
  persist<Store & Actions>(
    (set) => ({
      cartProducts: [],
      add: (newProduct: Product) =>
        set((state) => ({ cartProducts: [...state.cartProducts, newProduct] })),
      remove: (productId: number) =>
        set((state) => ({
          cartProducts: state.cartProducts.filter(
            (cartProduct) => cartProduct.id !== productId
          ),
        })),
      clear: () => set({ cartProducts: [] }),
    }),
    {
      name: "cart",
    }
  )
);
