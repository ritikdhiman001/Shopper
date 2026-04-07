import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = ({ onClose, refreshProducts }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discountPrice: "",
    description: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const form = new FormData();
      form.append("name", formData.name);
      form.append("price", formData.price);
      form.append("discountPrice", formData.discountPrice);
      form.append("description", formData.description);
      form.append("category", formData.category);
      if (!selectedFile) {
        toast.error("Please select an image");
        setIsSubmitting(false);
        return;
      }

      form.append("image", selectedFile);

      await axios.post("http://localhost:5000/api/clothes", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Product Added Successfully");
      refreshProducts();
      onClose();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong";

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div>
            <h2 className="text-xl font-bold">New Product</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-full text-black cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="py-1">
            <div className="group">
              <label className="text-[16px] font-medium">Product Title</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-xl outline-none"
              />
            </div>

            <div className="py-1">
              <label className="text-[16px] font-medium">Image Source</label>
              <div className="relative">
                <input
                  type="file"
                  name="image"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="w-full border border-gray-300 pl-2 pr-4 py-2 rounded-xl outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="py-1">
              <label className="text-[16px] font-medium">Original Price</label>
              <input
                type="number"
                name="price"
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-xl outline-none"
              />
            </div>
            <div className="py-1">
              <label className="text-[16px] font-medium">Discount Price</label>
              <input
                type="number"
                name="discountPrice"
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-xl outline-none"
              />
            </div>
          </div>

          <div className="py-1">
            <label className="text-[16px] font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-xl outline-none"
            >
              <option value="">Select Category</option>
              <option value="MEN">Men</option>
              <option value="WOMEN">Women</option>
              <option value="KIDS">Kids</option>
            </select>
          </div>

          <div className="py-1">
            <label className="block text-[16px] font-medium">
              Product Description
            </label>
            <textarea
              name="description"
              rows="3"
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-xl outline-none resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 font-medium rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              disabled={isSubmitting}
              type="submit"
              className="flex-1 bg-black text-white py-3 rounded-xl font-medium active:scale-95  flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <p>Save</p>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
