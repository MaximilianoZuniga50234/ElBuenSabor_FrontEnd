import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import Landing from "./components/landing/Landing";
import { NavBarPreLogin } from "./components/navbar/PreLogin/NavBarPreLogin";
import { NavBarPostLoginUsuarios } from "./components/navbar/PostLoginUsuarios/NavBarPostLoginUsuarios";
import { NavBarPostLoginEmpleados } from "./components/navbar/PostLoginEmpleados/NavBarPostLoginEmpleados";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      {isAuthenticated ? <NavBarPostLoginUsuarios /> : <NavBarPreLogin />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
