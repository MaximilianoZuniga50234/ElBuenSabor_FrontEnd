import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../interfaces/Product";
import { CartItem } from "../interfaces/CartItem";

type Store = {
  cartProducts: CartItem[];
};

type Actions = {
  add: (newProduct: Product) => void;
  remove: (productId: number) => void;
  clear: () => void;
  addOne: (productId: number) => void;
  removeOne: (productId: number) => void;
};

export const useStore = create(
  persist<Store & Actions>(
    (set) => ({
      cartProducts: [],
      add: (newProduct: Product) =>
        set((state) => {
          const existingProduct = state.cartProducts.find(
            (cartProduct) => cartProduct.product.id === newProduct.id
          );

          if (existingProduct) {
            const updatedCart = state.cartProducts.map((cartProduct) =>
              cartProduct.product.id === newProduct.id
                ? { ...cartProduct, amount: cartProduct.amount + 1 }
                : cartProduct
            );

            return { cartProducts: updatedCart };
          } else {
            return {
              cartProducts: [
                ...state.cartProducts,
                { product: newProduct, amount: 1 },
              ],
            };
          }
        }),
      remove: (productId: number) =>
        set((state) => ({
          cartProducts: state.cartProducts.filter(
            (cartItem) => cartItem.product.id !== productId
          ),
        })),
      clear: () => set({ cartProducts: [] }),
      addOne: (productId: number) =>
        set((state) => {
          const updatedCart = state.cartProducts.map((cartProduct) =>
            cartProduct.product.id === productId
              ? { ...cartProduct, amount: cartProduct.amount + 1 }
              : cartProduct
          );
          return { cartProducts: updatedCart };
        }),
      removeOne: (productId: number) =>
        set((state) => {
          const updatedCart = state.cartProducts.map((cartProduct) =>
            cartProduct.product.id === productId
              ? { ...cartProduct, amount: cartProduct.amount - 1 }
              : cartProduct
          );
          return { cartProducts: updatedCart };
        }),
    }),
    {
      name: "cart",
    }
  )
);
