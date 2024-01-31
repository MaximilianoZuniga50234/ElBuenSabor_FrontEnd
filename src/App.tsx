import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Toaster } from "sonner";
import { useStore as useCurrentUser } from "./app/store/CurrentUserStore";
import { useStore as useToken } from "./app/store/UserTokenStore";
import { useUserLogged } from "./app/hooks/useUserLogged";
import { useAllUsers } from "./app/hooks/useAllUsers";
import Router from "./app/routes/Router";
import NavBar from "./app/components/nav_bar/NavBar";
import Footer from "./app/components/footer/Footer";
import { useAddressesAndPersons } from "./app/hooks/useAddressesAndPersons";
import ModalEmployeeInauthorized from "./app/components/modalEmployeeInauthorized/ModalEmployeeInauthorized";

function App() {
  const { user } = useCurrentUser();
  const { setToken, token } = useToken();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  useUserLogged();
  useAllUsers();
  useAddressesAndPersons();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

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
    user && user.user_metadata.state === "De baja" && handleOpen();
  }, [user]);

  useEffect(() => {
    if (isAuthenticated && token === "") {
      getToken();
    }
  }, [isAuthenticated, token]);

  return (
    <main className="whole_app_container">
      <header className="whole_app_header">
        <NavBar />
      </header>
      <section className="main_content">
        <Router />
      </section>
      <Footer />
      <Toaster position="bottom-right" richColors visibleToasts={1} />
      <ModalEmployeeInauthorized open={open} />
    </main>
  );
}

export default App;
