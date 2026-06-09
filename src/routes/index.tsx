import { createBrowserRouter } from "react-router";

import Dashboard from "../pages/Dashboard";
import LandingPage from "../pages/Home";
import Login from "../pages/Login";
import Onboarding from "../pages/OnBoarding";
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
    ],
  },
]);

export default router;
