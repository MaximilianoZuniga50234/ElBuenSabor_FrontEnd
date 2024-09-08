import { create } from "zustand";
import { Product } from "../../interfaces/Product";

type Store = {
  products: Product[];
  add_all_product: () => void;
  add: (newProduct: Product) => void;
  remove: (productId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  products: [],
  add_all_product: async () => {
    const products = await fetch("http://localhost:9000/api/v1/product").then(
      (res) => res.json()
    );
    set({ products });
  },
  add: (newProduct: Product) =>
    set((state) => ({ products: [...state.products, newProduct] })),
  remove: (productId: number) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
}));
