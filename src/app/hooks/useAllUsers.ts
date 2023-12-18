import { useStore as useUsers } from "../../app/store/UsersStore";
import { getUserRole, getUsersAuth0 } from "../../app/functions/UserAPI";
import { UserAuth0Get } from "../../app/interfaces/UserAuth0";
import { useEffect } from "react";
export function useAllUsers() {
  const { setUsers, users } = useUsers();

  const getUsers = async () => {
    const users = await getUsersAuth0();
    const usersWithRole = await Promise.all(
      users.map(async (user: UserAuth0Get) => {
        const roles = await getUserRole(user.user_id);

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].description && roles[i].description != "Empleado") {
            const updatedEmployee = { ...user, role: roles[i].description };
            return updatedEmployee;
          }
        }
        return user;
      })
    );
    setUsers(usersWithRole);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);
}
