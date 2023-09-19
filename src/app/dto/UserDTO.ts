import { Base } from "../interfaces/Base";

export interface UserDTO extends Base {
  email: string;
  fullName: string;
  telephone: string;
  role: string;
  numberOfOrders: number;
}
