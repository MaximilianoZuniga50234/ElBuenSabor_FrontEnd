import { useState, useEffect, Suspense, lazy } from "react";
import { FaSearch } from "react-icons/fa";
import { UserAuth0Get } from "../../interfaces/UserAuth0";
import { useStore as useUsers } from "../../store/UsersStore";
import { useStore as useUser } from "../../store/CurrentUserStore";
import Loader from "../../components/loader/Loader";
import "./customers.css";

const Table = lazy(() => import("../../components/customers/CustomersTable"));
const NoPermissions = lazy(
  () => import("../../components/noPermissions/NoPermissions")
);

const Customers = () => {
  const [customers, setCustomers] = useState<UserAuth0Get[]>([]);
  const { users } = useUsers();
  const { user } = useUser();

  useEffect(() => {
    const customers = users.filter((customer) => customer.role === "Cliente");
    setCustomers(customers);
  }, [users]);

  return (
    <Suspense fallback={<Loader />}>
      {user?.role === "Administrador" ? (
        <main className="main_customers_list">
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
      )}
    </Suspense>
  );
};

export default Customers;
