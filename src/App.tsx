import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Toaster, toast } from "sonner";
import { useStore as useCurrentUser } from "./app/store/CurrentUserStore";
import { useStore as useToken } from "./app/store/UserTokenStore";
import { useUserLogged } from "./app/hooks/useUserLogged";
import { useAllUsers } from "./app/hooks/useAllUsers";
import Router from "./app/routes/Router";
import NavBar from "./app/components/nav_bar/NavBar";
import Footer from "./app/components/footer/Footer";
import { useAddressesAndPersons } from "./app/hooks/useAddressesAndPersons";


function App() {
  const { user } = useCurrentUser();
  const { setToken, token } = useToken();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  useUserLogged();
  useAllUsers();
  useAddressesAndPersons()
  const [isPerfilComplete, setIsPerfilComplete] = useState<boolean>(true);
  // const [tokenState, setTokenState] = useState("");

  const getToken = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });
      setToken(token);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(token)
  }, [token]);

  useEffect(() => {
    if (isAuthenticated && token === "") {
      getToken()
    }
  }, [isAuthenticated, token]);


  useEffect(() => {
    if (user != null) {
      if (
        user?.given_name === "" ||
        user?.family_name === "" ||
        user?.user_metadata?.address?.department === "" ||
        user?.user_metadata?.address?.number === 0 ||
        user?.user_metadata?.address?.street === ""
      ) {
        setIsPerfilComplete(false);
      }
    }
  }, [user]);

  return (
    <main className="whole_app_container">
      <header className="whole_app_header">
        <NavBar />
      </header>
      <section className="main_content">
        <Router />
      </section>
      <Footer />
      <Toaster position="top-center" richColors visibleToasts={1} />
      {isAuthenticated &&
        isPerfilComplete === false &&
        toast(
          "Presiona el icono del usuario que se encuentra a la derecha de la barra de navegación para completar tu perfil."
        )}
    </main>
  );
}

export default App;
