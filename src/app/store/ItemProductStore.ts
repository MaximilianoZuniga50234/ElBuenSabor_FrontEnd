import { create } from "zustand";
import { ItemProduct } from "../interfaces/ItemProduct";

type Store = {
  itemProducts: ItemProduct[];
  add: (newItemProduct: ItemProduct) => void;
  remove: (itemProductId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  itemProducts: [],
  add: (newItemProduct: ItemProduct) =>
    set((state) => ({ itemProducts: [...state.itemProducts, newItemProduct] })),
  remove: (itemProductId: number) =>
    set((state) => ({
      itemProducts: state.itemProducts.filter(
        (itemProduct) => itemProduct.id !== itemProductId
      ),
    })),
}));
