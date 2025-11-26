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
import DashboardLayout from "../dashboard/DashboardLayout";
import MyParcels from "../dashboard/pages/MyParcels";
// import Payment from "../dashboard/Payment/Payment";
import SuccessPayment from "../dashboard/SuccessPayment";
import CancelPayment from "../dashboard/CancelPayment";
import PaymentHistory from "../dashboard/PaymentHistory"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,

    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "rider",
        loader: () => fetch("/services.json").then((res) => res.json()),
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
      },
      {
        path: "send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("/services.json").then((res) => res.json()),
      },
      {
        path: "coverage",
        element: <Coverage></Coverage>,
        loader: () => fetch("/services.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "password",
        element: <ForgetPassword></ForgetPassword>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        element: <MyParcels></MyParcels>,
      },

      {
        path: "payment-success",
        element: <SuccessPayment></SuccessPayment>,
      },
      {
        path: "payment-canceled",
        element: <CancelPayment></CancelPayment>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
    ],
  },
]);
