import { create } from "zustand";
import { PurchaseOrder } from "../interfaces/PurchaseOrder";

type Store = {
  purchaseOrders: PurchaseOrder[];
  add: (newPurchaseOrder: PurchaseOrder) => void;
  remove: (purchaseOrderId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  purchaseOrders: [],
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
