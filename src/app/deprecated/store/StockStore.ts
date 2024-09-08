import { create } from "zustand";
import { Stock } from "../../interfaces/Stock";

type Store = {
  stocks: Stock[];
  add_all_stock: () => void;
  add: (newStock: Stock) => void;
  remove: (stockId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  stocks: [],
  add_all_stock: async () => {
    const stocks = await fetch("http://localhost:9000/api/v1/stock").then(
      (res) => res.json()
    );
    set({ stocks });
  },
  add: (newStock: Stock) =>
    set((state) => ({ stocks: [...state.stocks, newStock] })),
  remove: (stockId: number) =>
    set((state) => ({
      stocks: state.stocks.filter((stock) => stock.id !== stockId),
    })),
}));
