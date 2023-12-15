import Router from "./app/routes/Router";
import NavBar from "./app/components/nav_bar/NavBar";
import Footer from "./app/components/footer/Footer";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserAuth0XId } from "./app/functions/UserAPI";
import { useStore as useCurrentUser } from "./app/store/CurrentUserStore"
import { Toaster, toast } from "sonner";

function App() {
  const { user, setUser } = useCurrentUser()

  const [tokenState, setTokenState] = useState<string>('')
  const [isPerfilComplete, setIsPerfilComplete] = useState<boolean>(true)
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

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

  const getCurrentUser = async () => {
    const tokenSeparator = tokenState.split(".");
    const payload = JSON.parse(atob(tokenSeparator[1]))
    const userId = payload.sub
    const response = await getUserAuth0XId(userId)
    setUser(response)
  }

  useEffect(() => {
    if (isAuthenticated) getToken();
  }, [isAuthenticated]);

  useEffect(() => {
    if (tokenState != '') {
      getCurrentUser()
    }
  }, [tokenState]);

  useEffect(() => {
    if (user != null) {
      if (user?.given_name === "" || user?.family_name === "" || user?.user_metadata.address.department === "" || user?.user_metadata.address.number === 0 || user?.user_metadata.address.street === "") {
        setIsPerfilComplete(false)
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
      <footer>
        <Footer />
      </footer>
      <Toaster position="top-center" richColors visibleToasts={1} />
      {isAuthenticated && isPerfilComplete === false && toast("Presiona el icono del usuario que se encuentra a la derecha de la barra de navegación para completar tu perfil.")}
    </main>
  );
}

export default App;
