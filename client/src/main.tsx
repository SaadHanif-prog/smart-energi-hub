import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./routes/Route.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  </StrictMode>
);
