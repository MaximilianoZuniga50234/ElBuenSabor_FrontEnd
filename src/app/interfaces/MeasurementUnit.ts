import { Base } from "./Base";

export interface MeasurementUnit extends Base {
  name: string;
  active: boolean;
  abbreviation: string;
}
