import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="lg:min-h-screen bg-gray-100 flex lg:flex-row items-center overflow-hidden">
      <div className="flex-1 flex flex-col justify-center gap-6 px-6 md:px-20 lg:pl-32 lg:py-0">
        <div className="space-y-2">
          <h2 className="text-black text-3xl lg:text-xl font-bold tracking-widest text-center lg:text-left uppercase">
            New Arrivals Only
          </h2>
          <hr className="bg-black lg:w-30 h-2 rounded-full" />
        </div>

        <div className="text-left">
          <p className="text-black lg:text-[90px] text-[60px] font-extrabold leading-none tracking-tight ">
            New Collections For Everyone
          </p>
        </div>

        <p className="text-black lg:text-lg text-2xl max-w-md text-left font-medium capitalize">
          Discover the latest trends and redefine your style with our exclusive
          summer pieces.
        </p>
        <Link
          to="/category/mens"
          className="group relative flex justify-center items-center gap-4 lg:h-16 h-18 rounded-full mt-4 bg-black text-white lg:text-lg text-2xl px-5 py-2 lg:px-10 font-semibold cursor-pointer lg:self-start transition-all duration-300"
        >
          <span>Latest Collection</span>
          <img
            src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1771488923/arrow_okjubu.png"
            alt="arrow icon"
            className="lg:w-5 w-8 group-hover:translate-x-2 transition-transform duration-300"
          />
        </Link>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        <div className="absolute w-95 h-95 md:w-125 md:h-125 bg-[#ff414111] rounded-full blur-3xl -z-10"></div>

        <img
          src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1774426785/Blur_rbdte1.png"
          alt="hero"
          className="w-full max-w-200 lg:max-w-150 drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 ease-in-out object-contain lg:h-182"
        />
      </div>
    </div>
  );
};
// grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mt-8 items-stretch