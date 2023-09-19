import { Address } from "./Address";
import { Base } from "./Base";
import { Invoice } from "./Invoice";
import { PurchaseOrder } from "./PurchaseOrder";

export interface User extends Base {
  email: string;
  fullName: string;
  telephone: string;
  role: string;
  orders: PurchaseOrder[];
  addresses: Address[];
  invoices: Invoice[];
}
