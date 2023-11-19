import { Status } from "./Status";
import { Address } from "./Address";
import { Base } from "./Base";
import { User } from "../interfaces/User";
import { PurchaseOrderDetail } from "./PurchaseOrderDetail";

export interface PurchaseOrder extends Base {
  fecha: Date;
  number: number;
  estimatedEndTime: number;
  shippingType: string;
  paymentMethod: string;
  total: number;
  address: Address | null;
  user: User | null;
  status: Status | null;
  details: PurchaseOrderDetail[] | null;
}
