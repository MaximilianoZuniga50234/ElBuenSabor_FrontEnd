import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserAuth0XId, getUserRole } from "../functions/UserAPI";
import { useStore as useCurrentUser } from "../store/CurrentUserStore";

export function useUserLogged() {
  const { setUser } = useCurrentUser();
  const [tokenState, setTokenState] = useState<string>("");
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const getCurrentUser = async () => {
    const tokenSeparator = tokenState.split(".");
    const payload = JSON.parse(atob(tokenSeparator[1]));
    const userId = payload.sub;
    const response = await getUserAuth0XId(userId);
    const roles = await getUserRole(userId);
    let roleToAdd;
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].description && roles[i].description != "Empleado") {
        roleToAdd = roles[i].description;
      }
    }

    setUser({ ...response, role: roleToAdd });
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
    if (tokenState != "") {
      getCurrentUser();
    }
  }, [tokenState]);
}
