import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/employees/EmployeesTable";
import { useState, useEffect } from "react";
import { User } from "../../interfaces/User";
import { getAllUser } from "../../functions/UserAPI";
import "./employees.css";

const Employees = () => {
  const [employees, setEmployees] = useState<User[]>([]);

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const response = await getAllUser();
        setEmployees(
          response.filter(
            (user: User) =>
              user.role !== "Cliente" && user.role !== "Administrador"
          )
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
        <h2>Empleados</h2>
        <form>
          <input type="text" placeholder="Buscar por nombre y/o apellido" />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
        <button>
          <FaPlus />
          AÑADIR
        </button>
      </div>
      <Table datos={employees} />
    </main>
  );
};

export default Employees;
