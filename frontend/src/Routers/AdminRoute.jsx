import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/adminlogin" />;
  }
  try {
    const decoded = jwtDecode(token);
    if (decoded.role !== "ADMIN") {
      return <Navigate to="/" />;
    }
    return children;
  } catch {
    return <Navigate to="/adminlogin" />;
  }
};

export default AdminRoute;
