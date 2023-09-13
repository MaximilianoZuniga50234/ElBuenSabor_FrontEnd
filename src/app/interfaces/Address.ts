import { Base } from "./Base";
import { Department } from "./Department";
import { Person } from "./Person";

export interface Address extends Base {
  street: string;
  number: number;
  department: Department;
  person: Person;
}
