import { Base } from "./Base";

export interface Person extends Base {
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}
