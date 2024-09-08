import { Base } from "./Base";

export interface ItemStock extends Base {
  name: string;
  active: boolean;
  father?: ItemStock;
}
