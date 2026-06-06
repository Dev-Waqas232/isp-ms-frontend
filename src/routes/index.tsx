import { createBrowserRouter } from "react-router";

import LandingPage from "../pages/Home";
import Onboarding from "../pages/OnBoarding";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />
  }
]);

export default router;
