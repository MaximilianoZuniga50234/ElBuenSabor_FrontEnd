import { Base } from "./Base";
import { ItemProduct } from "./ItemProduct";
import { Stock } from "./Stock";

interface ProductDetail {
  amount: number;
  stock: Stock;
  product: Product;
}

export interface Product extends Base {
  estimatedTimeKitchen: number;
  denomination: string;
  salePrice: number;
  discountPercentaje: number;
  image: string;
  active: boolean;
  itemProduct: ItemProduct;
  details: ProductDetail[];
}