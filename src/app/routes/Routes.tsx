import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "../pages/Landing";
import Home from "../pages/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Error from "../pages/Error";
import About from "../pages/About";
import Employees from "../pages/employees/Employees";
import Customers from "../pages/customers/Customers";
import NavBar from "../components/nav_bar/NavBar";
import Footer from "../components/footer/Footer";

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <>
        <NavBar></NavBar>
        <Error />
        <Footer></Footer>
      </>
    ),
  },
  {
    path: "/",
    element: (
      <>
        <NavBar></NavBar>
        <Landing />
        <Footer></Footer>
      </>
    ),
  },
  {
    path: "/home",
    element: (
      <>
        <NavBar></NavBar>
        <Home />
        <Footer></Footer>
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <NavBar></NavBar>
        <Login />
        <Footer></Footer>
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <NavBar></NavBar>
        <Register />
        <Footer></Footer>
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <NavBar></NavBar>
        <About />
        <Footer></Footer>
      </>
    ),
  },
  {
    path: "/error",
    element: (
      <>
        <NavBar></NavBar>
        <Error />
        <Footer></Footer>
      </>
    ),
  },
  {
    path: "/employees",
    element: (
      <>
        <NavBar></NavBar>
        <Employees />
      </>
    ),
  },
  {
    path: "/customers",
    element: (
      <>
        <NavBar></NavBar>
        <Customers />
      </>
    ),
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
