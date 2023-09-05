import { create } from "zustand";
import { Stock } from "../interfaces/Stock";

type Store = {
  stocks: Stock[];
  add: (newStock: Stock) => void;
  remove: (stockId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  stocks: [],
  add: (newStock: Stock) =>
    set((state) => ({ stocks: [...state.stocks, newStock] })),
  remove: (stockId: number) =>
    set((state) => ({
      stocks: state.stocks.filter((stock) => stock.id !== stockId),
    })),
}));
