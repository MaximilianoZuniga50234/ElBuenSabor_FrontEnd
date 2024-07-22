import { Product } from "./Product";
import { Stock } from "./Stock";

export interface CartItem {
  product: Product | Stock;
  amount: number;
}
