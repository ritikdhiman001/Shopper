import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center gap-10 p-8 bg-white">
      <div className="flex items-center gap-4">
        <img
          src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1771500056/logo_big_ayetdt.png"
          alt="logo"
          className="w-10 lg:w-16"
        />
        <p className="text-[#383838] text-2xl lg:text-4xl font-bold tracking-tight">
          SHOPPER
        </p>
      </div>
      <ul className="flex flex-wrap justify-center items-center list-none gap-6 lg:gap-12 text-sm lg:text-lg font-medium">
        <Link
          to="/category/mens"
          className="cursor-pointer hover:text-[#ff4141] transition-colors duration-300"
        >
          Men
        </Link>
        <Link
          to="/category/womens"
          className="cursor-pointer hover:text-[#ff4141] transition-colors duration-300"
        >
          Women
        </Link>
        <Link
          to="/category/kids"
          className="cursor-pointer hover:text-[#ff4141] transition-colors duration-300"
        >
          Kids
        </Link>
        <Link className="cursor-pointer hover:text-[#ff4141] transition-colors duration-300">
          About
        </Link>
        <Link className="cursor-pointer hover:text-[#ff4141] transition-colors duration-300">
          Contact
        </Link>
      </ul>

      <div className="flex gap-4">
        <Link
          to="https://www.instagram.com/"
          target="_blank"
          className="p-3 bg-[#fbfbfb] border border-[#ebebeb] rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <img
            src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1771500562/instagram_icon_mxnmqm.png"
            alt="instagram"
            className="w-5"
          />
        </Link>
        <Link
          to="https://web.whatsapp.com/"
          target="_blank"
          className="p-3 bg-[#fbfbfb] border border-[#ebebeb] rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <img
            src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1771500541/whatsapp_icon_gws434.png"
            alt="whatsapp"
            className="w-5"
          />
        </Link>
        <Link
          to="https://www.pinterest.com/"
          target="_blank"
          className="p-3 bg-[#fbfbfb] border border-[#ebebeb] rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <img
            src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1771500604/pintester_icon_nmwqhd.png"
            alt="pinterest"
            className="w-5"
          />
        </Link>
      </div>

      {/* Copyright Section */}
      <div className="flex flex-col items-center gap-6 w-full mt-10 text-[#1a1a1a]">
        <hr className="w-[85%] border-none h-[1.5px] bg-gray-200" />
        <div className="text-center px-4">
          <p className="text-sm lg:text-base font-medium text-gray-500">
            Copyright © 2026 - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
