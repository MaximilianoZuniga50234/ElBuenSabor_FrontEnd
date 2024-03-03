import { Status } from "./Status";
import { Address } from "./Address";
import { Base } from "./Base";
import { PurchaseOrderDetail } from "./PurchaseOrderDetail";
import { Person } from "./Person";

export interface PurchaseOrder extends Base {
  fecha: Date;
  number: number;
  estimatedEndTime: number;
  shippingType: string;
  paymentMethod: string;
  total: number;
  amountToPaid: number;
  active: boolean;
  address?: Address;
  person?: Person | null;
  status: Status | null;
  details: PurchaseOrderDetail[] | null;
}
