import { Status } from "./Status";
import { Address } from "./Address";
import { Base } from "./Base";
import { Product } from "./Product";
import { Stock } from "./Stock";
import { User } from "../interfaces/User";

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
  user: User;
  status: Status;
  details: PurchaseOrderDetail[];
}
