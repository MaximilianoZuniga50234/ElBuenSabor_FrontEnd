import { Base } from "./Base";

export interface MercadoPagoData extends Base {
  paymentIdentifier: number;
  creatioDate: Date;
  approvalDate: Date;
  paymentMehod: string;
  cardNumber: string;
  state: string;
}
