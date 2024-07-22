import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../interfaces/Product";
import { CartItem } from "../interfaces/CartItem";
import { Stock } from "../interfaces/Stock";

type Store = {
  cartProducts: CartItem[];
};

type Actions = {
  add: (newProduct: Product | Stock) => void;
  remove: (productId: number, type: string) => void;
  clear: () => void;
  addOne: (productId: number, type: string) => void;
  removeOne: (productId: number, type: string) => void;
};

export const useStore = create(
  persist<Store & Actions>(
    (set) => ({
      cartProducts: [],
      add: (newProduct: Product | Stock) =>
        set((state) => {
          const existingProduct = state.cartProducts.find(
            (cartProduct) =>
              cartProduct.product.id === newProduct.id &&
              cartProduct.product.type === newProduct.type
          );

          if (existingProduct) {
            const updatedCart = state.cartProducts.map((cartProduct) =>
              cartProduct.product.id === newProduct.id &&
              cartProduct.product.type === newProduct.type
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
      remove: (productId: number, type: string) =>
        set((state) => ({
          cartProducts: state.cartProducts.filter(
            (cartItem) =>
              cartItem.product.id !== productId &&
              cartItem.product.type === type
          ),
        })),
      clear: () => set({ cartProducts: [] }),
      addOne: (productId: number, type: string) =>
        set((state) => {
          const updatedCart = state.cartProducts.map((cartProduct) =>
            cartProduct.product.id === productId &&
            cartProduct.product.type === type
              ? { ...cartProduct, amount: cartProduct.amount + 1 }
              : cartProduct
          );
          return { cartProducts: updatedCart };
        }),
      removeOne: (productId: number, type: string) =>
        set((state) => {
          const updatedCart = state.cartProducts.map((cartProduct) =>
            cartProduct.product.id === productId &&
            cartProduct.product.type === type
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
