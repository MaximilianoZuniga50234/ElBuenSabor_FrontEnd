import { Base } from "./Base";
import { MercadoPagoData } from "./MercadoPagoData";
import { Product } from "./Product";
import { PurchaseOrder } from "./PurchaseOrder";
import { Stock } from "./Stock";

export interface InvoiceDetail {
  amount: number;
  subtotal: number;
  invoice: Invoice;
  product: Product;
  stock: Stock;
}

export interface Invoice extends Base {
  date: Date;
  discountAmount?: number;
  totalSale: number;
  totalCost: number;
  active: boolean;
  purchaseOrder: PurchaseOrder;
  mercadoPagoData?: MercadoPagoData;
  details: InvoiceDetail[];
}
