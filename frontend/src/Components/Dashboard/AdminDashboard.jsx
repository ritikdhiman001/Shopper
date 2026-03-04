import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1  ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
