import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/employees/EmployeesTable";
import { useState, useEffect } from "react";
import "./employees.css";
import { UserAuth0Get } from "../../interfaces/UserAuth0";
import ModalEmployeesAbm from "../../components/employees/ModalEmployeesAbm";
import { useStore as useUsers } from "../../store/UsersStore";
import { useStore as useUser } from "../../store/CurrentUserStore";
import NoPermissions from "../../components/noPermissions/NoPermissions";
import Loader from "../../components/loader/Loader";

const Employees = () => {
  const [employees, setEmployees] = useState<UserAuth0Get[]>([]);
  const { users } = useUsers();
  const { user } = useUser();

  const employeeInitialState: UserAuth0Get = {
    created_at: new Date(),
    email: "email@example.com",
    email_verified: false,
    family_name: "",
    given_name: "",
    identities: [],
    locale: "",
    name: "",
    nickname: "",
    picture: "",
    updated_at: new Date(),
    user_id: "0",
    user_metadata: {
      phone_number: 0,
      address: {
        department: "Ciudad",
        number: 0,
        street: "",
      },
      roleToAdd: "",
      state: "De alta",
    },
    last_login: new Date(),
    last_ip: "",
    logins_count: 0,
    role: "",
  };

  const [employee, setEmployee] = useState<UserAuth0Get>(employeeInitialState);
  const [isNew, setIsNew] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setIsNew(true);
    setOpen(true);
  };

  const handleOpenModal = () => {
    setEmployee(employeeInitialState);
    handleOpen();
  };

  useEffect(() => {
    const employees = users.filter(
      (user) => user.role != "Cliente" && user.role != "Administrador"
    );
    setEmployees(employees);
  }, [users]);

  return user?.role ? (
    user.role === "Administrador" ? (
      <main className="main_employees_list">
        <div className="title_container">
          <h2>Empleados</h2>
          <form>
            <input type="text" placeholder="Buscar por nombre y/o apellido" />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
          <button onClick={handleOpenModal}>
            <FaPlus />
            AÑADIR
          </button>
        </div>
        <Table datos={employees} />
        <ModalEmployeesAbm
          employee={employee}
          isNew={isNew}
          open={open}
          setOpen={setOpen}
        />
      </main>
    ) : (
      <NoPermissions />
    )
  ) : (
    <Loader />
  );
};

export default Employees;
