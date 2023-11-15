import { create } from "zustand";
import { ItemStock } from "../../interfaces/ItemStock";

type Store = {
  itemStocks: ItemStock[];
  add_all_item_stock: () => void;
  add: (newItemStock: ItemStock) => void;
  remove: (stockId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  itemStocks: [],
  add_all_item_stock: async () => {
    const itemStocks = await fetch(
      "http://localhost:9000/api/v1/itemStock"
    ).then((res) => res.json());
    set({ itemStocks });
  },
  add: (newItemStock: ItemStock) =>
    set((state) => ({ itemStocks: [...state.itemStocks, newItemStock] })),
  remove: (stockId: number) =>
    set((state) => ({
      itemStocks: state.itemStocks.filter(
        (itemStock) => itemStock.id !== stockId
      ),
    })),
}));
