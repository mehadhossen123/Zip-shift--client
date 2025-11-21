import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../pages/home/home/Home";
import Coverage from "../pages/home/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../Rider/Rider";
import ForgetPassword from "../pages/Auth/ForgetPassword/ForgetPassword";
import SendParcel from "../pages/Parcel/SendParcel";

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
        path:"rider",
        element:<PrivateRoute>
            <Rider></Rider>
        </PrivateRoute>

    },
    {
        path:"send-parcel",
        element:<PrivateRoute>
            <SendParcel></SendParcel>
        </PrivateRoute>

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
        },
        {
            path:"password",
            element:<ForgetPassword></ForgetPassword>
        }
    ]
  }
]);
