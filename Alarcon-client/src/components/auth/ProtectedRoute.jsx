import { Navigate } from "react-router-dom";
import {
  getAuthToken,
  getFirstAllowedDashboardPath,
  getStoredUser,
  hasAllowedRole,
} from "../../utils/auth";

const ProtectedRoute = ({ allowedRoles, children, fallbackTo }) => {
  const token = getAuthToken();
  const user = getStoredUser();

  if (!token || !user) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (allowedRoles?.length && !hasAllowedRole(allowedRoles, user)) {
    return <Navigate to={fallbackTo || getFirstAllowedDashboardPath(user)} replace />;
  }

  return children;
};

export default ProtectedRoute;
