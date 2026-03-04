import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-black text-white p-6 space-y-6">
      <h2 className="text-2xl font-bold">Admin Panel</h2>
      <nav className="flex flex-col gap-4 ">
        <Link to="/admin" className="hover:text-gray-300 hover:underline">
          Dashboard
        </Link>
        <Link to="/admin/users" className="hover:text-gray-300 hover:underline">
          User
        </Link>
        <Link
          to="/admin/products"
          className="hover:text-gray-300 hover:underline"
        >
          Products
        </Link>
        <Link to="/admin" className="hover:text-gray-300 hover:underline">
          Logout
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
