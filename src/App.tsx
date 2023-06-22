import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMeasurementUnit } from "./context/measurementUnitSlice";
import { setStock } from "./context/stockSlice";
import { setArticuloManufacturado } from "./context/articuloManufacturadoSlice";
import { Rutas } from "./routes/Rutas";
import Footer from "./components/footer/Footer";
import { setEmpleado } from "./context/empleadosSlice";
import NavBarPreLogin from './components/navBar/preLogin/NavBarPreLogin'
import NavBarPostLoginUsuarios from "./components/navBar/postLoginUsuarios/NavBarPostLoginUsuarios";

function App() {
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setStock(data.categorias));
        dispatch(setArticuloManufacturado(data.articulosManufacturados));
        dispatch(setMeasurementUnit(data.unidadMedida));
        dispatch(setEmpleado(data.empleado));
      });
  }, []);

  return (
    <div className="App">
      {isAuthenticated ? <NavBarPostLoginUsuarios /> : <NavBarPreLogin />}
      <Rutas />
    </div>
  );
}

export default App;
