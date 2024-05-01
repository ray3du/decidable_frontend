import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  if (!localStorage.getItem("decidable_token")) {
    return <Navigate to="/login" replace />;
  } else {
    return <Outlet />;
  }
}
