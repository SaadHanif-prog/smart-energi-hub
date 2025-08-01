import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layout
import Layout from "../layout/layout";

// Pages
import Dashboard from "../pages/dashboard";
import Contact from "../pages/contact";
import Properties from "../pages/properties";
import Projects from "../pages/projects";
import Leads from "../pages/leads";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "/contacts",
          element: <Contact />,
        },
        {
          path: "/properties",
          element: <Properties />,
        },
        {
          path: "/projects",
          element: <Projects />,
        },
        {
          path: "/leads",
          element: <Leads />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
