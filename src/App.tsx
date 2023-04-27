import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import { NavBarPreLogin } from "./components/NavBar/PreLogin/NavBarPreLogin";
import { NavBarPostLoginUsuarios } from "./components/NavBar/PostLoginUsuarios/NavBarPostLoginUsuarios";
import { NavBarPostLoginEmpleados } from "./components/NavBar/PostLoginEmpleados/NavBarPostLoginEmpleados";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      {isAuthenticated ? <NavBarPostLoginUsuarios /> : <NavBarPreLogin />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
