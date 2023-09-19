import { FaSearch } from "react-icons/fa";
import Table from "../../components/customers/CustomersTable";
import "./customers.css";
import { useStore as useUsers } from "../../store/UserStore";
import { User } from "../../interfaces/User";

const Customers = () => {
  const customers: User[] = useUsers()
    .users.filter((user) => user.role === "Cliente")
    .sort((a: User, b: User) => b.orders.length - a.orders.length);

  return (
    <main className="main_employees_list">
      <div className="title_container">
        <h2>Clientes</h2>
        <form>
          <input type="text" placeholder="Buscar por nombre y/o apellido" />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </div>
      <Table datos={customers} />
    </main>
  );
};

export default Customers;
