import { Base } from "./Base";
import { ItemStock } from "./ItemStock";
import { MeasurementUnit } from "./MeasurementUnit";

export interface Stock extends Base {
  denomination: string;
  purchasePrice: number;
  salePrice: number;
  currentStock: number;
  minimumStock: number;
  isStock: boolean;
  active: boolean;
  measurementUnit: MeasurementUnit;
  itemStock: ItemStock;
}
