import { useStore as useUser } from "../../store/UserStore";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import "./employees.css";
import Table from "../../components/employees/EmployeesTable";

const Employees = () => {
  const employees = useUser().users.filter(
    (user) => user.role.role !== "Cliente" && user.role.role !== "Administrador"
  );

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
