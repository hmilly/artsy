import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import LoadingState from "./LoadingState";

const PrivateRoute = () => {
  const { loggedIn, checkStatus } = useAuthStatus();

  if (checkStatus) {
    return <LoadingState />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
