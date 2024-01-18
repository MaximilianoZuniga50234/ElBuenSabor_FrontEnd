import { useStore as useUsers } from "../../app/store/UsersStore";
import { getUserRole, getUsersAuth0 } from "../../app/functions/UserAPI";
import { UserAuth0Get } from "../../app/interfaces/UserAuth0";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export function useAllUsers() {
  const { setUsers, users } = useUsers();
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    isAuthenticated && getUsers();
  }, [isAuthenticated]);

  const getUsers = async () => {
    const usersToAdd = await getUsersAuth0();
    if (users.length != usersToAdd.length) {
      const usersWithRole = await Promise.all(
        usersToAdd.map(async (user: UserAuth0Get) => {
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
    }
  };
}
