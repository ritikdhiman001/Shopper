import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Shop from "../Pages/Shop";
import { Product } from "../Pages/Product";
import { Cart } from "../Pages/Cart";
import Footer from "../Components/Footer/Footer";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import CategoryPage from "../Pages/CategoryPage ";
import ScrollToTop from "./ScrollToTop";
import AdminDashboard from "../Components/Dashboard/AdminDashboard";
import AdminLogin from "../Components/Dashboard/AdminLogin";
import AdminRoute from "./AdminRoute";
import Users from "../Components/Dashboard/Users";
import AdminProduct from "../Components/Dashboard/AdminProduct";
import AdminOverview from "../Components/Dashboard/AdminOverview";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

function Navigations() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* User Routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Shop />} />
          <Route path="/category/:type" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<AdminProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default Navigations;
