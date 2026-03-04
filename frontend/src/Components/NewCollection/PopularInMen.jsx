import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const PopularInMen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClothes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/clothes?category=MEN`,
      );
      setData(res.data.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClothes();
  }, []);
  return (
    <div className="flex flex-col items-center gap-6 py-16 px-4 sm:px-8 md:px-12 lg:px-20 bg-white">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-[#171717] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-center uppercase">
          Popular in Men
        </h1>
        <div className="w-20 sm:w-24 h-1.5 bg-[#ff4141] rounded-full"></div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <LoaderCircle size={40} className="animate-spin" />
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10 w-full max-w-7xl items-stretch">
          {data.map((item, i) => (
            <div key={i} className="flex w-full">
              <div className="w-full flex flex-col gap-3 bg-white group">
                <Link
                  to={`/product/${item.id}`}
                  className="relative overflow-hidden rounded-lg border border-gray-100"
                >
                  <img
                    loading="lazy"
                    onClick={() => window.scrollTo(0, 0)}
                    className="w-full h-75 md:h-87.5 lg:h-100 object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    src={item.image}
                    alt={item.name}
                  />
                </Link>

                <div className="flex flex-col gap-2 px-1">
                  <p className="text-[#374151] text-base font-medium leading-tight line-clamp-2">
                    {item.name}
                  </p>

                  <div className="flex gap-4 items-center">
                    <div className="text-[#171717] text-lg font-bold">
                      ₹{Number(item.discountPrice).toLocaleString()}
                    </div>

                    <div className="text-[#8c8c8c] text-sm font-medium line-through">
                      ₹{Number(item.price).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
