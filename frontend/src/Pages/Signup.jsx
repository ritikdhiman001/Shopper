import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleValue = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all required details");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/register",
        formData,
      );
      toast
      toast.success(res.data.message || "Registration Successful!");
      navigate("/login");
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fce3fe6b] py-8 md:py-6 flex justify-center items-center px-4">
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
          <h1 className="text-[#171717] text-2xl md:text-4xl font-bold text-center">
            Create Account
          </h1>
          <p className="text-center text-gray-500 text-sm md:text-base mt-2">
            Join us to buy products
          </p>
        </header>

        <div className="flex flex-col gap-4 mt-2">
          {[
            { name: "name", placeholder: "Your Name", type: "text" },
            { name: "phone", placeholder: "Phone Number", type: "tel" },
            { name: "address", placeholder: "Your Address", type: "text" },
            { name: "email", placeholder: "Email Address", type: "email" },
            { name: "password", placeholder: "Password", type: "password" },
          ].map((input) => (
            <input
              key={input.name}
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              onChange={handleValue}
              className="h-12 md:h-14 w-full pl-5 border border-gray-300 rounded-xl outline-none text-gray-700 text-base md:text-lg focus:border-[#ff4141] focus:ring-1 focus:ring-[#ff4141] transition-all"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full h-12 md:h-14 text-white bg-[#ff4141] mt-2 rounded-xl text-lg md:text-xl font-semibold cursor-pointer active:scale-95 transition-all shadow-md hover:bg-[#e63a3a] ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creating Account..." : "Continue"}
        </button>

        <p className="mt-2 text-[#5c5c5c] text-sm md:text-base font-medium text-center">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-[#ff4141] font-bold hover:underline underline-offset-4 ml-1">
              Login here
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
