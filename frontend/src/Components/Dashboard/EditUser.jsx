import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const EditUser = ({ user, onClose, refreshUser }) => {
  const { name, email, address, phone } = user;
  const [formData, setFormData] = useState({
    name: name || "",
    email: email || "",
    address: address || "",
    phone: phone || "",
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
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/user/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("User Update Successfully");
      refreshUser();
      onClose();
    } catch {
      toast.error("Faild To Update User");
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-semibold">Edit User Profile</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 text-black cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form className="p-6" onSubmit={handleSubmit}>
          <div className="py-1">
            <label className="text-[16px] font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 outline-none"
            />
          </div>

          <div className="py-2">
            <label className="text-[16px] font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 outline-none"
            />
          </div>

          <div className="py-2">
            <label className="text-[16px] font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 outline-none"
            />
          </div>

          <div className="py-2">
            <label className="text-[16px] font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 outline-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-xl border border-gray-300 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-xl bg-black text-white font-semibold transition-all active:scale-95 cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
