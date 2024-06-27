import { Navigate, Outlet } from "react-router-dom";

function PrivateRouter() {
  const token = localStorage.getItem("JWT_token");
  if (token === null || token === undefined) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
export default PrivateRouter;
