import { X } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const EditProduct = ({ product, onClose, refreshProducts }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discountPrice: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice,
        description: product.description,
        category: product.category,
      });
      setPreview(product.image);
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const form = new FormData();
      form.append("name", formData.name);
      form.append("price", formData.price);
      form.append("discountPrice", formData.discountPrice);
      form.append("description", formData.description);
      form.append("category", formData.category);

      if (selectedFile) {
        form.append("image", selectedFile);
      }
      await axios.put(`http://localhost:5000/api/clothes/${product.id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Product Update Successfully");
      refreshProducts();
      onClose();
    } catch (error) {
      toast.error("Faild To Update Product");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-semibold">Edit Product</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 text-black cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="py-1">
            <label className="text-[16px] font-medium">Product Title</label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-xl outline-none"
            />
          </div>

          <div className="py-1">
            <label className="text-[16px] font-medium">Product Image</label>
            <div className="flex gap-4">
              {preview && (
                <img
                  src={preview}
                  alt="img"
                  className="mt-3 h-30 object-cover rounded-xl"
                />
              )}
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="w-full border border-gray-300 pl-1 pr-4 py-2 rounded-xl outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="py-1">
              <label className="text-[16px] font-medium">Original Price</label>
              <input
                required
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-xl outline-none"
              />
            </div>
            <div className="py-1">
              <label className="text-[16px] font-medium">Discount Price</label>
              <input
                required
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-xl outline-none"
              />
            </div>
          </div>

          <div className="py-1">
            <label className="text-[16px font-medium]">Category</label>
            <select
              name="category"
              required
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
              value={formData.description}
              onChange={handleChange}
              name="description"
              required
              rows="3"
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
              type="submit"
              className="flex-1 bg-black text-white py-3 rounded-xl font-medium active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
