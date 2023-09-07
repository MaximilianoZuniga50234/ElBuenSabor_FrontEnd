import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "../pages/Landing";
import Home from "../pages/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Error from "../pages/Error";
import Layout from "../Layout";
import About from "../pages/About";
import {Header1} from "../components/header/Header1";

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <Layout>
        <Error />
      </Layout>
    ),
  },
  {
    path: "/",
    element: (
      <Layout>
        <Landing />
      </Layout>
    ),
  },
  {
    path: "/home",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: "/about",
    element: (
      <Layout>
        <About />
      </Layout>
    ),
  },
  {
    path: "/error",
    element: (
      <Layout>
        <Error />
      </Layout>
    ),
  },
  {
    path: "/header1",
    element: (
      <Layout>
        <Header1 />
      </Layout>
    ),
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
