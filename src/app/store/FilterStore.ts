import { create } from "zustand";
import { Params } from "../interfaces/FilterParams";

type Store = {
  params: Params;
  active: boolean;
};

type Actions = {
  setName: (name: string) => void;
  setOrder: (order: string) => void;
  setCategory: (category: string) => void;
  setMinPrice: (minPrice: string) => void;
  setMaxPrice: (maxPrice: string) => void;
  setActive: (active: boolean) => void;
  clearFilter: () => void;
};

const INITIAL_STATE_PARAMS = {
  productName: "",
  productOrder: "",
  productCategory: "",
  productMinPrice: "",
  productMaxPrice: "",
};

export const useStore = create<Store & Actions>((set) => ({
  params: INITIAL_STATE_PARAMS,
  active: false,
  setName: (name: string) =>
    set((state) => ({
      ...state,
      params: { ...state.params, productName: name },
    })),
  setOrder: (order: string) =>
    set((state) => ({
      ...state,
      params: { ...state.params, productOrder: order },
    })),
  setCategory: (category: string) =>
    set((state) => ({
      ...state,
      params: { ...state.params, productCategory: category },
    })),
  setMinPrice: (minPrice: string) =>
    set((state) => ({
      ...state,
      params: { ...state.params, productMinPrice: minPrice },
    })),
  setMaxPrice: (maxPrice: string) =>
    set((state) => ({
      ...state,
      params: { ...state.params, productMaxPrice: maxPrice },
    })),
  setActive: (active: boolean) =>
    set((state) => ({
      ...state,
      active: active,
    })),
  clearFilter: () =>
    set((state) => ({ ...state, params: INITIAL_STATE_PARAMS, active: false })),
}));
