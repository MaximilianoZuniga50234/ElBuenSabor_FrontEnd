import { create } from "zustand";
import { PurchaseOrder } from "../interfaces/PurchaseOrder";

type Store = {
  purchaseOrders: PurchaseOrder[];
  add_all_purchase_order: () => void;
  add: (newPurchaseOrder: PurchaseOrder) => void;
  remove: (purchaseOrderId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  purchaseOrders: [],
  add_all_purchase_order: async () => {
    const purchaseOrders = await fetch(
      "http://localhost:9000/api/v1/purchaseOrder"
    ).then((res) => res.json());
    set({ purchaseOrders });
  },
  add: (newPurchaseOrder: PurchaseOrder) =>
    set((state) => ({
      purchaseOrders: [...state.purchaseOrders, newPurchaseOrder],
    })),
  remove: (purchaseOrderId: number) =>
    set((state) => ({
      purchaseOrders: state.purchaseOrders.filter(
        (purchaseOrder) => purchaseOrder.id !== purchaseOrderId
      ),
    })),
}));
