import { create } from "zustand";
import { MercadoPagoData } from "../interfaces/MercadoPagoData";

type Store = {
  mercadoPagoDataArray: MercadoPagoData[];
  add: (newMercadoPagoData: MercadoPagoData) => void;
  remove: (mercadoPagoDataId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  mercadoPagoDataArray: [],
  add: (newMercadoPagoData: MercadoPagoData) =>
    set((state) => ({
      mercadoPagoDataArray: [...state.mercadoPagoDataArray, newMercadoPagoData],
    })),
  remove: (mercadoPagoDataId: number) =>
    set((state) => ({
      mercadoPagoDataArray: state.mercadoPagoDataArray.filter(
        (mercadoPagoData) => mercadoPagoData.id !== mercadoPagoDataId
      ),
    })),
}));
