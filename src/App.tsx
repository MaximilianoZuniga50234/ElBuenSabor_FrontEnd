import NavBarPreLogin from "./components/navbar/prelogin/NavBarPreLogin";
import NavBarPostLoginUsuarios from "./components/navbar/postloginusuarios/NavBarPostLoginUsuarios";
import NavBarPostLoginEmpleados from "./components/navbar/postloginempleados/NavBarPostLoginEmpleados";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setStock } from "./context/stockSlice";
import { setArticuloManufacturado } from "./context/articuloManufacturadoSlice";
import { setUnidadMedida } from "./context/UnidadMedidaSlice";
import { Rutas } from "./routes/Rutas";
import Footer from "./components/footer/Footer";

function App() {
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setStock(data.categorias));
        dispatch(setArticuloManufacturado(data.articulosManufacturados));
        dispatch(setUnidadMedida(data.unidadMedida));
      });
  }, []);

  return (
    <div className="App">
      {isAuthenticated ? <NavBarPostLoginUsuarios /> : <NavBarPreLogin />}
      <Rutas />
      <Footer />
    </div>
  );
}

export default App;
