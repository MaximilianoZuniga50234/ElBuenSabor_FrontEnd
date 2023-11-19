import { Product } from "./Product";

export interface CartItem {
  product: Product;
  amount: number;
}
