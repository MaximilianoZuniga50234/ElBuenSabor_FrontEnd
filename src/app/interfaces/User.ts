import { Base } from "./Base";
import { Person } from "./Person";
import { Role } from "./Role";

export interface User extends Base {
  user: string;
  password: string;
  person: Person;
  role: Role;
}
