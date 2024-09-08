import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useStore as useCurrentUser } from "../store/CurrentUserStore";
import { useStore as useUsers } from "../store/UsersStore";

export function useUserLogged() {
  const { setUser } = useCurrentUser();
  const { users } = useUsers();
  const [tokenState, setTokenState] = useState<string>("");
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const getCurrentUser = async () => {
    const tokenSeparator = tokenState.split(".");
    const payload = JSON.parse(atob(tokenSeparator[1]));
    const userId = payload.sub;
    const user = users.find((user) => user.user_id === userId);
    if (user) {
      setUser(user);
    }
  };

  const getToken = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });
      setTokenState(token);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) getToken();
  }, [isAuthenticated]);

  useEffect(() => {
    if (tokenState != "" && users.length > 1) {
      getCurrentUser();
    }
  }, [tokenState, users]);
}
