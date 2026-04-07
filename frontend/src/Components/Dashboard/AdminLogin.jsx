import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/login", formData);

      const { token, user } = res.data;

      if (user.role !== "ADMIN") {
        toast.error("Access Denied, Only Login Admin.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-3xl p-10 shadow-xl border border-gray-100 flex flex-col gap-6"
      >
        <h1 className="text-3xl font-bold text-center">Welcome Back Admin</h1>
        <div>
          <label>Admin Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="h-12 md:h-16 w-full pl-6 border border-[#c3c3c3] rounded-xl outline-none text-[#5c5c5c] text-base md:text-lg focus:border-black focus:ring-1 focus:ring-black transition-all"
          />
        </div>

        <div>
          <label>Admin Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="h-12 md:h-16 w-full pl-6 border border-[#c3c3c3] rounded-xl outline-none text-[#5c5c5c] text-base md:text-lg focus:border-black focus:ring-1 focus:ring-black transition-all"
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className={`h-15 bg-black active:scale-95 text-white rounded-xl mt-4 cursor-pointer font-medium text-[18px] ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
