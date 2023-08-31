import { Base } from "./Base";
import { MercadoPagoData } from "./MercadoPagoData";
import { Product } from "./Product";
import { PurchaseOrder } from "./PurchaseOrder";
import { Stock } from "./Stock";

interface InvoiceDetail{
  amount: number;
  subtotal: number;
  invoice: Invoice;
  product: Product;
  stock: Stock;
}

export interface Invoice extends Base{
  date: Date;
  discountAmount: number;
  paymentMethod: string;
  totalSale: number;
  totalCost: number;
  purchaseOrder: PurchaseOrder;
  mercadoPagoData: MercadoPagoData;
  details: InvoiceDetail[];
}
