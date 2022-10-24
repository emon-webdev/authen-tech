import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import Home from "../components/Home";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Register from "../components/Register";
import Wallet from "../components/Wallet";
import Root from "../layout/Root";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
{
  path:'/',
  element:<Root/>,
  errorElement:<ErrorPage/>,
  children:[
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path:'/wallet',
      element:<PrivateRoute><Wallet/></PrivateRoute>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/register',
      element:<Register/>
    },
    {
      path:'/profile',
      element:<PrivateRoute><Profile/></PrivateRoute>
    },
  ]
}
]);

export default router;