import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "../pages/Landing";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error from "../pages/Error";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Error/>,
  },{
    path: "/",
    element: <Landing/>,
  },{
    path: "/home",
    element: <Home/>,
  },{
    path: "/login",
    element: <Login/>,
  },{
    path: "/register",
    element: <Register/>,
  },
]);

const Routes = () => {
  return <RouterProvider router={router}/>;
};

export default Routes;
