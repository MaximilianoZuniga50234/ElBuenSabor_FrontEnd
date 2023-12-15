import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/employees/EmployeesTable";
import { useState, useEffect } from "react";
import { getUserRole, getUsersAuth0 } from "../../functions/UserAPI";
import "./employees.css";
import { UserAuth0Get } from "../../interfaces/UserAuth0";
import ModalEmployeesAbm from "../../components/employees/ModalEmployeesAbm";


const Employees = () => {
  const [employees, setEmployees] = useState<UserAuth0Get[]>([]);
  const [employeesFilter, setEmployeesFilter] = useState<UserAuth0Get[]>([]);

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
        street: ""
      },
      roleToAdd: "",
      state: "De alta"
    },
    last_login: new Date(),
    last_ip: "",
    logins_count: 0,
    role: "",
  }

  const [employee, setEmployee] = useState<UserAuth0Get>(employeeInitialState);
  const [isLoaded, setIsLoaded] = useState(false)
  const [isNew, setIsNew] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setIsNew(true)
    setOpen(true)
  };

  const handleOpenModal = () => {
    setEmployee(employeeInitialState)
    handleOpen()
  }


  const getAllUsers = async () => {
    const response = await getUsersAuth0()
    setEmployees(response)
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const getRole = async () => {

    const updatedEmployees = await Promise.all(
      employees.map(async (employee: UserAuth0Get) => {
        const response = await getUserRole(employee.user_id);

        for (let i = 0; i < response.length; i++) {
          if (response[i].description && response[i].description != "Empleado") {
            const updatedEmployee = { ...employee, role: response[i].description };
            return updatedEmployee;
          }
        }
        return employee
      }))

    const employeesFilter = updatedEmployees.filter(employee => employee.role != 'Cliente' && employee.role != 'Administrador')
    setEmployeesFilter(employeesFilter);
  }

  useEffect(() => {
    if (employees.length > 0) {
      setIsLoaded(true)
    }
  }, [employees])

  useEffect(() => {
    if (isLoaded === true) {
      getRole()
    }
  }, [isLoaded])

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
        <button onClick={handleOpenModal}>
          <FaPlus />
          AÑADIR
        </button>
      </div>
      <Table datos={employeesFilter} />
      <ModalEmployeesAbm employees={employees} employee={employee} isNew={isNew} open={open} setOpen={setOpen} />
    </main>
  );
};

export default Employees;
