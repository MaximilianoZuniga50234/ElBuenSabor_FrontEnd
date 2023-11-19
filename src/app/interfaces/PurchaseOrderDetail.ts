import { Product } from "./Product";
import { PurchaseOrder } from "./PurchaseOrder";
import { Stock } from "./Stock";

export interface PurchaseOrderDetail {
  amount: number;
  subtotal: number;
  order: PurchaseOrder;
  product: Product | null;
  stock: Stock | null;
}
