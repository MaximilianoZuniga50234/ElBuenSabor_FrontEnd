import { create } from "zustand";
import { ItemStock } from "../interfaces/ItemStock";

type Store = {
  itemStocks: ItemStock[];
  add: (newItemStock: ItemStock) => void;
  remove: (stockId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  itemStocks: [],
  add: (newItemStock: ItemStock) =>
    set((state) => ({ itemStocks: [...state.itemStocks, newItemStock] })),
  remove: (stockId: number) =>
    set((state) => ({
      itemStocks: state.itemStocks.filter(
        (itemStock) => itemStock.id !== stockId
      ),
    })),
}));
