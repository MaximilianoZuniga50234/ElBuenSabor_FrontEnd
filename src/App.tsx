import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import { NavBarPreLogin } from "./components/NavBar/PreLogin/NavBarPreLogin";
import { NavBarPostLoginUsuarios } from "./components/NavBar/PostLoginUsuarios/NavBarPostLoginUsuarios";
import { NavBarPostLoginEmpleados } from "./components/NavBar/PostLoginEmpleados/NavBarPostLoginEmpleados";
import StockList from "./components/StockList/StockList";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <BrowserRouter>
        {isAuthenticated ? <NavBarPostLoginUsuarios /> : <NavBarPreLogin />}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/stockList" element={<StockList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
