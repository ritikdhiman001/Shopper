import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

function Navbar() {
  const [menu, setMenu] = useState("shop");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="flex items-center justify-between px-4 py-3 lg:px-20 lg:py-5 bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-2 lg:gap-4">
        <Link to="/" onClick={() => setMenu("shop")}>
          <img
            src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1771500056/logo_big_ayetdt.png"
            alt="logo"
            className="w-8 lg:w-12"
          />
        </Link>
        <p className="text-[#171717] text-xl lg:text-3xl font-bold italic tracking-wider">
          SHOPPER
        </p>
      </div>

      <button
        className="lg:hidden p-2 text-2xl focus:outline-none"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? "✕" : "☰"}
      </button>
      <ul
        className={`
                flex flex-col lg:flex-row items-center list-none gap-6 lg:gap-10 text-[#626262] text-lg font-medium
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
          <Link to="/" className="hover:text-black transition-colors">
            Shop
          </Link>
          {menu === "shop" && (
            <hr className="w-4/5 h-1 rounded-full bg-[#ff4141] border-none" />
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
            className="hover:text-black transition-colors"
          >
            Men
          </Link>
          {menu === "men" && (
            <hr className="w-4/5 h-1 rounded-full bg-[#ff4141] border-none" />
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
            className="hover:text-black transition-colors"
          >
            Women
          </Link>
          {menu === "womens" && (
            <hr className="w-4/5 h-1 rounded-full bg-[#ff4141] border-none" />
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
            className="hover:text-black transition-colors"
          >
            Kids
          </Link>
          {menu === "kids" && (
            <hr className="w-4/5 h-1 rounded-full bg-[#ff4141] border-none" />
          )}
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <Link to="/login">
          <button className="w-24 lg:w-30 h-10 lg:h-12 outline-none border border-[#7a7a7a] rounded-full text-[#515151] text-base lg:text-lg font-medium bg-white active:bg-[#f3f3f3] transition-colors cursor-pointer">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="w-24 lg:w-30 h-10 lg:h-12 outline-none border border-[#7a7a7a] rounded-full text-[#515151] text-base lg:text-lg font-medium bg-white active:bg-[#f3f3f3] transition-colors cursor-pointer">
            Signup
          </button>
        </Link>
        <div className="relative flex items-center">
          <Link to="/cart">
            <img
              src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1772640252/cart_icon_exaar9.png"
              alt="cart"
              className="w-6 lg:w-8"
            />
          </Link>
          <div className="absolute -top-2 -right-2 w-4 lg:w-5 h-4 lg:h-5 flex justify-center items-center rounded-full text-[10px] lg:text-[12px] bg-[#ff4141] text-white">
            {getTotalCartItems()}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
