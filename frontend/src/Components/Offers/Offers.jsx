export const Offers = () => {
  return (
    <div className="w-full flex justify-center items-center py-10">
      <div className="w-[90%] lg:w-[60%] max-w-7xl min-h-100 flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 bg-linear-to-r from-[#fde1ff] to-[#e1ffea66] rounded-3xl overflow-hidden shadow-sm">
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left py-12 lg:py-0 space-y-4">
          <div className="space-y-1">
            <h1 className="text-[#171717] text-5xl lg:text-7xl font-bold leading-none tracking-tight">
              Exclusive
            </h1>
            <h1 className="text-[#171717] text-5xl lg:text-7xl font-bold leading-none tracking-tight">
              Offers For You
            </h1>
          </div>

          <p className="text-[#374151] text-lg lg:text-xl font-semibold uppercase tracking-widest mt-2">
            Only On Best Sellers Products
          </p>

          <button className="w-56 lg:w-64 h-14 lg:h-16 rounded-full bg-[#ff4141] text-white text-lg font-bold mt-6 cursor-pointer shadow-lg hover:bg-[#171717] transition-colors duration-300">
            Check Now
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center lg:justify-end">
          <img
            src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1771499988/exclusive_image_tux7t0.png"
            alt="Exclusive Offer"
            className="w-full max-w-25 md:max-w-100 lg:max-w-none h-auto object-contain pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};
