import { Base } from "./Base";
import { Invoice } from "./Invoice";
import { PurchaseOrder } from "./PurchaseOrder";

export interface CreditNote extends Base {
  date: Date;
  total: number;
  purchaseOrder: PurchaseOrder;
  invoice: Invoice;
}
