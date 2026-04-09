import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/adminlogin";
  };
  return (
    <div className="w-64 min-h-screen bg-black text-white p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">Admin Panel</h2>

      <div className="pt-4  ">
        <nav className="flex flex-col gap-4 ">
          <Link
            to="/admin"
            className="bg-white hover:bg-gray-100 text-center text-black px-4 py-2 rounded-lg active:scale-95 font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/users"
            className="bg-white hover:bg-gray-100 text-center text-black px-4 py-2 rounded-lg active:scale-95 font-medium"
          >
            User
          </Link>
          <Link
            to="/admin/products"
            className="bg-white hover:bg-gray-100 text-black text-center px-4 py-2 rounded-lg active:scale-95 font-medium"
          >
            Products
          </Link>
          <Link
            to="/admin/orders"
            className="bg-white hover:bg-gray-100 text-black text-center px-4 py-2 rounded-lg active:scale-95 font-medium"
          >
            Seles
          </Link>
          <button
            onClick={logout}
            className="cursor-pointer bg-red-600 px-4 py-2 rounded-xl hover:bg-red-700"
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
