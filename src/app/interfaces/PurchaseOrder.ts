import { Address } from "./Address";
import { Base } from "./Base";
import { Person } from "./Person";
import { Product } from "./Product";
import { State } from "./State";
import { Stock } from "./Stock";

interface PurchaseOrderDetail {
  amount: number;
  subtotal: number;
  order: PurchaseOrder;
  product: Product;
  stock: Stock;
}

export interface PurchaseOrder extends Base {
  fecha: Date;
  number: number;
  estimatedEndTime: number;
  shippingType: string;
  paymentMethod: string;
  total: number;
  address: Address;
  person: Person;
  state: State;
  details: PurchaseOrderDetail[];
}
