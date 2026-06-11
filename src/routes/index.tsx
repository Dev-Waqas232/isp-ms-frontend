import { createBrowserRouter } from "react-router";

import CustomerDetail from "../pages/CustomerDetail";
import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import LandingPage from "../pages/Home";
import Login from "../pages/Login";
import Onboarding from "../pages/OnBoarding";
import Payments from "../pages/Payments";
import Plans from "../pages/Plans";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/customers",
        element: <Customers />,
      },
      {
        path: "/dashboard/customers/:id",
        element: <CustomerDetail />,
      },
      {
        path: "/dashboard/payments",
        element: <Payments />,
      },
      {
        path: "/dashboard/plans",
        element: <Plans />,
      },
    ],
  },
]);

export default router;
