export const NewsLetter = () => {
  return (
    <div className="flex justify-center w-full px-4 py-16">
      <div className="w-full lg:w-[80%] max-w-7xl flex flex-col items-center justify-center p-8 md:p-16 lg:py-20 bg-linear-to-b from-[#fde1ff] to-[#e1ffea66] rounded-3xl gap-6 lg:gap-8 text-center shadow-sm">
        <div className="space-y-3">
          <h1 className="text-[#171717] text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            Get Exclusive Offers On Your Email
          </h1>
          <p className="text-[#454545] text-base md:text-lg lg:text-xl font-medium">
            Subscribe to our newsletter and stay updated
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center bg-white w-full max-w-175 rounded-2xl sm:rounded-full border border-[#e3e3e3] p-1 sm:p-0 overflow-hidden mt-4">
          <input
            type="email"
            placeholder="Your Email id"
            className="w-full sm:flex-1 py-4 px-6 md:px-10 border-none outline-none text-[#616161] text-base bg-transparent"
          />
          <button className="w-full sm:w-44 lg:w-52 h-14 lg:h-16 rounded-2xl sm:rounded-full bg-black text-white text-base font-semibold cursor-pointer hover:bg-[#333] transition-all active:scale-95">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};
