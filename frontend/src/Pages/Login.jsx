import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        loginData,
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fce3fe6b] py-10 md:py-20 flex justify-center items-center px-4">
      <div className="w-full max-w-md md:max-w-xl bg-white rounded-2xl md:rounded-3xl p-6 sm:p-10 md:p-14 shadow-xl border border-gray-100 flex flex-col gap-4 md:gap-6">
        <Link
          to="/"
          className="text-sm font-medium text-gray-500 hover:text-red-500 flex items-center gap-2 mb-8 transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to site
        </Link>
        <header>
          <h1 className="text-[#171717] text-3xl md:text-4xl font-bold text-center">
            Welcome Back
          </h1>
          <p className="text-center text-gray-500 text-sm md:text-base mt-2">
            Please enter your details to login
          </p>
        </header>

        <div className="flex flex-col gap-4 mt-2">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
            className="h-12 md:h-16 w-full pl-6 border border-[#c3c3c3] rounded-xl outline-none text-[#5c5c5c] text-base md:text-lg focus:border-[#ff4141] focus:ring-1 focus:ring-[#ff4141] transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="h-12 md:h-16 w-full pl-6 border border-[#c3c3c3] rounded-xl outline-none text-[#5c5c5c] text-base md:text-lg focus:border-[#ff4141] focus:ring-1 focus:ring-[#ff4141] transition-all"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full h-12 md:h-16 text-white bg-[#ff4141] mt-2 rounded-xl text-lg md:text-xl font-semibold cursor-pointer active:scale-95 transition-all shadow-md hover:bg-[#e63a3a] ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-2 text-[#5c5c5c] text-sm md:text-base font-medium text-center">
          Don&apos;t have an account yet?{" "}
          <Link to="/signup">
            <span className="text-[#ff4141] font-bold hover:underline underline-offset-4 ml-1">
              Signup here
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
