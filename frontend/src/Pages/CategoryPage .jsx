import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

const CategoryPage = () => {
  const { type } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategory = () => {
    if (type === "mens") return "MEN";
    if (type === "womens") return "WOMEN";
    if (type === "kids") return "KIDS";
    return "";
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const category = getCategory();
      const res = await axios.get(
        `http://localhost:5000/api/clothes?category=${category}`,
      );

      setData(res.data.data);
    } catch {
      toast.error("Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoaderCircle size={50} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full bg-white pb-20 pt-10">
      <div className="grid grid-cols-4 gap-6 mt-10 w-[85%]">
        {data.map((item, idx) => (
          <>
            <div
              key={idx}
              className="w-full flex flex-col gap-3 bg-white group"
            >
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

              <div className="flex flex-col gap-2">
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
          </>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
