import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#fde1ff] via-[#e1ffea55] to-[#fde1ff] flex flex-col lg:flex-row items-center overflow-hidden">
      <div className="flex-1 flex flex-col justify-center gap-6 px-6 md:px-20 lg:pl-32 py-16 lg:py-0">
        <div className="space-y-2">
          <h2 className="text-[#374151] text-lg md:text-xl font-bold tracking-widest text-center lg:text-left uppercase">
            New Arrivals Only
          </h2>
          <div className="h-1 w-20 bg-[#ff4141] mx-auto lg:mx-0 rounded-full"></div>
        </div>

        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <p className="text-[#171717] text-6xl md:text-[90px] font-extrabold leading-none tracking-tight">
              new
            </p>
            <img
              className="w-16 md:w-20 animate-bounce-slow"
              src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1771488818/hand_icon_rc6xvd.png"
              alt="hand icon"
            />
          </div>
          <p className="text-[#171717] text-6xl md:text-[90px] font-extrabold leading-none">
            collections
          </p>
          <p className="text-[#ff4141] text-5xl md:text-[80px] font-extrabold leading-tight">
            for everyone
          </p>
        </div>

        <p className="text-[#555] text-lg max-w-md text-center lg:text-left font-medium">
          Discover the latest trends and redefine your style with our exclusive
          summer pieces.
        </p>
        <Link
          to="/category/mens"
          className="group relative flex justify-center items-center gap-4 w-64 md:w-72 h-16 rounded-full mt-4 bg-red-500 text-white text-lg font-semibold cursor-pointer self-center lg:self-start transition-all duration-300 hover:bg-red-600"
        >
          <span>Latest Collection</span>
          <img
            src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1771488923/arrow_okjubu.png"
            alt="arrow icon"
            className="w-5 group-hover:translate-x-2 transition-transform duration-300"
          />
        </Link>
      </div>

      <div className="flex-1 relative flex items-center justify-center p-6 lg:p-0">
        <div className="absolute w-75 h-75 md:w-125 md:h-125 bg-[#ff414111] rounded-full blur-3xl -z-10"></div>

        <img
          src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1771488852/hero_image_s6sgqb.png"
          alt="hero"
          className="w-full max-w-112.5 md:max-w-150 drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 ease-in-out object-contain"
        />
      </div>
    </div>
  );
};
