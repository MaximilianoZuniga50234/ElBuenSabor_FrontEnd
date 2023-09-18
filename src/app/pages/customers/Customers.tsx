import { FaSearch } from "react-icons/fa";
import { useStore as useUser } from "../../store/UserStore";
import Table from "../../components/customers/CustomersTable";
import "./customers.css";

const Customers = () => {
  const customers = useUser().users.filter(
    (user) => user.role.role == "Cliente"
  );

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
