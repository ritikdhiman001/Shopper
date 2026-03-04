import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const AdminLogin = () => {
  const navigate = useNavigate();

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
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fce3fe6b] py-10 flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl border border-gray-100 flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center">Welcome Back Admin</h1>

        <label>Admin Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="h-12 border rounded-xl px-3"
          required
        />

        <label>Admin Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="h-12 border rounded-xl px-3"
          required
        />

        <button
          type="submit"
          className="h-12 bg-red-500 text-white rounded-xl mt-4 cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
