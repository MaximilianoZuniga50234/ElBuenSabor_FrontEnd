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
  const [isLoaded, setisLoaded] = useState(false);

  useEffect(() => {
    try {
      const customers = users.filter((customer) => customer.role === "Cliente");
      setCustomers(customers);
    } catch (error) {
      console.error(error);
    } finally {
      setisLoaded(true);
    }
  }, [users]);

  return (
    user?.role && (
      <Suspense fallback={<Loader />}>
        {user?.role === "Administrador" ? (
          <main className="main_customers_list">
            <div className="title_container">
              <h2>Clientes</h2>
              <form>
                <input
                  type="text"
                  placeholder="Buscar por nombre y/o apellido"
                />
                <button type="submit">
                  <FaSearch />
                </button>
              </form>
            </div>
            {isLoaded &&
              (customers && customers.length > 0 ? (
                <Table datos={customers} />
              ) : (
                <h1>No hay clientes</h1>
              ))}
          </main>
        ) : (
          <NoPermissions />
        )}
      </Suspense>
    )
  );
};

export default Customers;
