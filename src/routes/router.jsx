import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../pages/home/home/Home";
import Coverage from "../pages/home/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

 export const router = createBrowserRouter([
  {
    path: "/",
 element:<HomeLayout></HomeLayout>,
 
 children:[
    {
        index:true,
        element:<Home></Home>,
        
    },
    {
        path:"coverage",
        element:<Coverage></Coverage>,
        loader:()=>fetch('/services.json').then(res=>res.json())
    }
 ]

 
  },
  {
    path:"/",
    element:<AuthLayout></AuthLayout>,
    children:[
        {
            path:"login",
            element:<Login></Login>
        },
        {
            path:"register",
            element:<Register></Register>
        }
    ]
  }
]);
