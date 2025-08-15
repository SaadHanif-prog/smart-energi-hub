import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/layout";
import LoginPage from "../pages/auth/loign";
import Dashboard from "../pages/dashboard";
import Contact from "../pages/contact";
import Properties from "../pages/properties";
import Projects from "../pages/projects";
import Leads from "../pages/leads";
import Jobs from "../pages/jobs";
import SubContractor from "../pages/sub-contractor";
import Appointments from "../pages/appointments";
import MaterialProfile from "../pages/material-profiles";
import DataMatch from "../pages/datamatch";
import SignatureRequests from "../pages/signature-requests";
import ProtectedRoute from "../components/auth/protected-route";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <Dashboard /> },
        { path: "/contacts", element: <Contact /> },
        { path: "/properties", element: <Properties /> },
        { path: "/projects", element: <Projects /> },
        { path: "/leads", element: <Leads /> },
        { path: "/jobs", element: <Jobs /> },
        { path: "/sub-contractor", element: <SubContractor /> },
        { path: "/appointments", element: <Appointments /> },
        { path: "/material-profile", element: <MaterialProfile /> },
        { path: "/data-match", element: <DataMatch /> },
        { path: "/signature-requests", element: <SignatureRequests /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
