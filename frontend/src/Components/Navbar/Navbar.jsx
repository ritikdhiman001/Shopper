import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { CircleUser } from "lucide-react";

function Navbar() {
  const [menu, setMenu] = useState("shop");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  return (
    <nav className="flex items-center justify-between px-10 py-8 lg:px-20 lg:py-5 bg-white shadow-sm sticky top-0 z-50 h-40 lg:h-20">
      <div className="flex items-center gap-2 lg:gap-4">
        <Link to="/" onClick={() => setMenu("shop")}>
          <img
            src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1771500056/logo_big_ayetdt.png"
            alt="logo"
            className="lg:w-12 w-20"
          />
        </Link>
        <p className="lg:text-3xl text-4xl font-bold tracking-wider">SHOPPER</p>
      </div>

      <button
        className="lg:hidden p-2 lg:text-3xl text-4xl focus:outline-none"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? "✕" : "☰"}
      </button>
      <ul
        className={`
                flex flex-col lg:flex-row items-center list-none gap-6 lg:gap-10 text-lg font-medium
                absolute lg:static top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none transition-all duration-300 ease-in
                ${isMobileMenuOpen ? "opacity-100 py-6" : "opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto h-0 lg:h-auto overflow-hidden lg:overflow-visible"}
            `}
      >
        <li
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => {
            setMenu("shop");
            setIsMobileMenuOpen(false);
          }}
        >
          <Link
            to="/"
            className="hover:text-black transition-colors lg:text-[18px] text-2xl"
          >
            Shop
          </Link>
          {menu === "shop" && (
            <hr className="w-4/5 h-1 rounded-full bg-black border-none" />
          )}
        </li>
        <li
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => {
            setMenu("men");
            setIsMobileMenuOpen(false);
          }}
        >
          <Link
            to="/category/mens"
            className="hover:text-black transition-colors lg:text-[18px] text-2xl"
          >
            Men
          </Link>
          {menu === "men" && (
            <hr className="w-4/5 h-1 rounded-full bg-black border-none" />
          )}
        </li>
        <li
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => {
            setMenu("womens");
            setIsMobileMenuOpen(false);
          }}
        >
          <Link
            to="/category/womens"
            className="hover:text-black transition-colors lg:text-[18px] text-2xl"
          >
            Women
          </Link>
          {menu === "womens" && (
            <hr className="w-4/5 h-1 rounded-full bg-black border-none" />
          )}
        </li>
        <li
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => {
            setMenu("kids");
            setIsMobileMenuOpen(false);
          }}
        >
          <Link
            to="/category/kids"
            className="hover:text-black transition-colors lg:text-[18px] text-2xl"
          >
            Kids
          </Link>
          {menu === "kids" && (
            <hr className="w-4/5 h-1 rounded-full bg-black border-none" />
          )}
        </li>
      </ul>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <div className="relative">
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full cursor-pointer"
            >
              <CircleUser />
            </div>
            {showDropdown && (
              <>
                <div className="absolute right-0 mt-2 lg:w-40 w-50 bg-white shadow-lg rounded-lg border overflow-hidden ">
                  <div className="p-2 text-white ">
                    <button className=" lg:text-[16px] text-2xl w-full px-4 py-2 cursor-pointer bg-white text-black hover:bg-gray-200 rounded">
                      My Orders
                    </button>
                    <button
                      onClick={logout}
                      className="w-full px-4 py-2 hover:bg-red-600 hover:text-white text-black text-center rounded cursor-pointer text-2xl lg:text-[16px] "
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="px-8 py-2 border rounded-full lg:text-[18px] text-2xl">
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="px-8 py-2 border rounded-full lg:text-[18px] text-2xl">
                Signup
              </button>
            </Link>
          </>
        )}

        <div className="relative flex items-center">
          <Link to="/cart">
            <img
              src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1772640252/cart_icon_exaar9.png"
              alt="cart"
              className="lg:w-7 w-10"
            />
          </Link>
          <div className="absolute -top-3 -right-3 lg:p-2 sm:p-3 w-5 h-5 flex justify-center items-center rounded-full lg:text-[12px] bg-black text-white">
            {getTotalCartItems()}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
