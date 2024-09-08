import { create } from "zustand";
import { MercadoPagoData } from "../../interfaces/MercadoPagoData";

type Store = {
  mercadoPagoDataArray: MercadoPagoData[];
  add_all_mercado_pago_data: () => void;
  add: (newMercadoPagoData: MercadoPagoData) => void;
  remove: (mercadoPagoDataId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  mercadoPagoDataArray: [],
  add_all_mercado_pago_data: async () => {
    const mercadoPagoDataArray = await fetch(
      "http://localhost:9000/api/v1/mercadoPagoData"
    ).then((res) => res.json());
    set({ mercadoPagoDataArray });
  },
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
