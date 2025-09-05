import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'
// Types 
import type { RootState } from "../../states/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
   const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn)

   console.log("Auth state", isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
