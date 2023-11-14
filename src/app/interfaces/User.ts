import { Address } from "./Address";
import { Base } from "./Base";
import { Invoice } from "./Invoice";

export interface User extends Base {
  email: string;
  fullName: string;
  telephone: string;
  role: string;
  orders: number;
  user: string;
  addresses: Address[];
  invoices: Invoice[];
}
