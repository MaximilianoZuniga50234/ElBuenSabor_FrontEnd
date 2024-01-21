import { FaSearch } from "react-icons/fa";
import Table from "../../components/customers/CustomersTable";
import { useState, useEffect } from "react";
// import { getUserRole, getUsersAuth0 } from "../../functions/UserAPI";
import "./customers.css";
import { UserAuth0Get } from "../../interfaces/UserAuth0";
import { useStore as useUsers } from "../../store/UsersStore";
import { useStore as useUser } from "../../store/CurrentUserStore";
import NoPermissions from "../../components/noPermissions/NoPermissions";
import Loader from "../../components/loader/Loader";

const Customers = () => {
  const [customers, setCustomers] = useState<UserAuth0Get[]>([]);
  const { users } = useUsers();
  const { user } = useUser();

  useEffect(() => {
    const customers = users.filter((customer) => customer.role === "Cliente");
    setCustomers(customers);
  }, [users]);

  return user?.role ? (
    user.role === "Administrador" ? (
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
    ) : (
      <NoPermissions />
    )
  ) : (
    <Loader />
  );
};

export default Customers;
