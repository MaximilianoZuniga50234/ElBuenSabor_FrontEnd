import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import { NavBarPreLogin } from "./components/NavBar/PreLogin/NavBarPreLogin";
import { NavBarPostLoginUsuarios } from "./components/NavBar/PostLoginUsuarios/NavBarPostLoginUsuarios";
import { NavBarPostLoginEmpleados } from "./components/NavBar/PostLoginEmpleados/NavBarPostLoginEmpleados";

function App() {
  return (
    <div className="App">
      <NavBarPostLoginEmpleados/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
