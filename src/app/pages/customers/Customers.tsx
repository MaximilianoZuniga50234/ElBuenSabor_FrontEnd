import { FaSearch } from "react-icons/fa";
import Table from "../../components/customers/CustomersTable";
import { useState, useEffect } from "react";
// import { getUserRole, getUsersAuth0 } from "../../functions/UserAPI";
import "./customers.css";
import { UserAuth0Get } from "../../interfaces/UserAuth0";
import { useStore as useUsers } from "../../store/UsersStore"

const Customers = () => {

  const [customers, setCustomers] = useState<UserAuth0Get[]>([]);
  const { users } = useUsers()


  useEffect(() => {
    const customers = users.filter(customer => customer.role === 'Cliente')
    setCustomers(customers);
  }, [users])

  // const [allUsers, setAllUsers] = useState<UserAuth0Get[]>([]);
  // const [isLoaded, setIsLoaded] = useState(false)
  // const getAllUsers = async () => {
  //   const response = await getUsersAuth0()
  //   setAllUsers(response)
  // };

  // useEffect(() => {
  //   getAllUsers();
  // }, []);

  // const getRole = async () => {
  //   const updatedCustomers = await Promise.all(
  //     allUsers.map(async (user: UserAuth0Get) => {
  //       const response = await getUserRole(user.user_id);

  //       if (response[0].description) {
  //         const updatedEmployee = { ...user, role: response[0].description };
  //         return updatedEmployee;
  //       }
  //       return user
  //     }))

  //   const customersFilter = updatedCustomers.filter(customer => customer.role === 'Cliente')
  //   setCustomers(customersFilter);
  // }

  // useEffect(() => {
  //   if (allUsers.length > 0) {
  //     setIsLoaded(true)
  //   }
  // }, [allUsers])

  // useEffect(() => {
  //   if (isLoaded === true) {
  //     getRole()
  //   }
  // }, [isLoaded])

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
