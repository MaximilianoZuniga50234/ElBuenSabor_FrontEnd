import { create } from "zustand";
import { Product } from "../interfaces/Product";

type Store = {
  cartProducts: Product[];
  add: (newProduct: Product) => void;
  remove: (productId: number) => void;
  clear: () => void;
};

export const useStore = create<Store>((set) => ({
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
}));
