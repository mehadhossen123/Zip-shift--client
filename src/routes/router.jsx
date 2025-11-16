import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../pages/home/home/Home";
import Coverage from "../pages/home/Coverage";

 export const router = createBrowserRouter([
  {
    path: "/",
 element:<HomeLayout></HomeLayout>,
 children:[
    {
        index:true,
        element:<Home></Home>
    },
    {
        path:"/coverage",
        element:<Coverage></Coverage>,
        loader:()=>fetch('/services.json').then(res=>res.json())
    }
 ]
 
  },
]);
