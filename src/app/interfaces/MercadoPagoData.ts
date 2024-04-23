import { Base } from "./Base";

export interface MercadoPagoData extends Base {
  collectionId: string;
  collectionStatus: string;
  paymentId: string;
  status: string;
  externalReference: string;
  paymentType: string;
  merchantOrderId: string;
  preferenceId: string;
  siteId: string;
  processingMode: string;
  merchantAccountId: string;
}
