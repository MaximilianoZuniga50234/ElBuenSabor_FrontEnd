import { create } from "zustand";
import { Invoice } from "../interfaces/Invoice";

type Store = {
  invoices: Invoice[];
  add: (newInvoice: Invoice) => void;
  remove: (invoiceId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  invoices: [],
  add: (newInvoice: Invoice) =>
    set((state) => ({ invoices: [...state.invoices, newInvoice] })),
  remove: (invoiceId: number) =>
    set((state) => ({
      invoices: state.invoices.filter((invoice) => invoice.id !== invoiceId),
    })),
}));
