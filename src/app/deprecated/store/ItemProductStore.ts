import { create } from "zustand";
import { ItemProduct } from "../../interfaces/ItemProduct";

type Store = {
  itemProducts: ItemProduct[];
  add_all_item_product: () => void;
  add: (newItemProduct: ItemProduct) => void;
  remove: (itemProductId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  itemProducts: [],
  add_all_item_product: async () => {
    const itemProducts = await fetch("http://localhost:9000/api/v1/itemProduct").then(
      (res) => res.json()
    );
    set({ itemProducts });
  },
  add: (newItemProduct: ItemProduct) =>
    set((state) => ({ itemProducts: [...state.itemProducts, newItemProduct] })),
  remove: (itemProductId: number) =>
    set((state) => ({
      itemProducts: state.itemProducts.filter(
        (itemProduct) => itemProduct.id !== itemProductId
      ),
    })),
}));
