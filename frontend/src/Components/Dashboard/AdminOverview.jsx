import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { LoaderCircle, Baby, CircleUser } from "lucide-react";
import { GrRestroomWomen } from "react-icons/gr";
import { GrRestroomMen } from "react-icons/gr";

const AdminOverview = () => {
  const [overview, setOverview] = useState({
    totalMen: 0,
    totalUser: 0,
    totalWomen: 0,
    totalKids: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchOverview = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/admin/overviewdata",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setOverview(res.data.data || res.data);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch overview");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <div className="p-8">
      <div className="py-5">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-50">
          <LoaderCircle className="w-10 h-10 text-black animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-5">
          <div className="bg-white p-6 rounded-xl shadow border border-transparent hover:border-black transition-all">
            <h2 className="text-gray-600 font-medium flex justify-start items-center gap-4">
              Total Men Products <GrRestroomMen size={25} />
            </h2>
            <p className="text-2xl font-bold">{overview.totalMen}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border border-transparent hover:border-black transition-all">
            <h2 className="text-gray-600 font-medium flex justify-start items-center gap-4">
              Total Women Products <GrRestroomWomen size={25} />
            </h2>
            <p className="text-2xl font-bold">{overview.totalWomen} </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border border-transparent hover:border-black transition-all">
            <h2 className="text-gray-600 font-medium flex justify-start items-center gap-4">
              Total Kids Products <Baby size={25} />
            </h2>
            <p className="text-2xl font-bold">{overview.totalKids}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border border-transparent hover:border-black transition-all">
            <h2 className="text-gray-600 font-medium flex justify-start items-center gap-4">
              Total Users <CircleUser size={25} />
            </h2>
            <p className="text-2xl font-bold">{overview.totalUser}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOverview;
