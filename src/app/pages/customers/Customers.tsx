import { FaSearch } from "react-icons/fa";
import Table from "../../components/customers/CustomersTable";
import { User } from "../../interfaces/User";
import { useState, useEffect } from "react";
import { getAllUser } from "../../functions/UserAPI";
import "./customers.css";

const Customers = () => {
  const [customers, setCustomers] = useState<User[]>([]);

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const response = await getAllUser();
        setCustomers(
          response
            .filter((user: User) => user.role === "Cliente")
            .sort((a: User, b: User) => b.orders - a.orders)
        );
      } catch (error) {
        console.error("Error", error);
      }
    };

    getAllItems();
  }, []);

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
