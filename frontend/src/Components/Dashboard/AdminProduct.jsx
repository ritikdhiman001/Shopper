import axios from "axios";
import { LoaderCircle, ShoppingBag, Edit3, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const AdminProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectProduct, setSelectProduct] = useState(null);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are You Sure To Delete Product ?");

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/clothes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Product Delete Successfully");
      setData((prev) => prev.filter((product) => product.id !== id));
    } catch {
      toast.error("Faild To Delete Product");
    }
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/clothes");
      setData(res.data.data);
    } catch {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between py-4">
        <div>
          <h1 className="text-3xl font-bold ">Product Management</h1>
        </div>
        <div className="flex gap-5">
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg">
            <button
              onClick={() => setIsAddOpen(true)}
              className="font-semibold cursor-pointer active:scale-95"
            >
              Add Product
            </button>
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg">
            <ShoppingBag size={20} />
            <span className="font-semibold">{data.length} Total Products</span>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-[15px] font-bold uppercase">
                <th className="px-6 py-5">Id</th>
                <th className="px-6 py-5">Product</th>
                <th className="px-6 py-5">Description</th>
                <th className="px-6 py-5 text-right">Pricing</th>
                <th className="px-6 py-5 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <LoaderCircle className="w-10 h-10 text-black animate-spin" />
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <h3>No Product Found</h3>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((elem, idx) => (
                  <tr
                    key={elem.id || idx}
                    className="hover:bg-gray-50/80 transition-all duration-200 group text-[15px] border-b border-gray-200"
                  >
                    <td className="px-6 py-4">{idx + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-14 rounded-lg overflow-hidden">
                          <img
                            src={elem.image}
                            alt={elem.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="max-w-38">{elem.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[15px] line-clamp-2 max-w-xs">
                        {elem.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold">
                          ₹{elem.discountPrice}
                        </span>
                        <span className="text-[13px] text-gray-500 line-through">
                          ₹{elem.price}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectProduct(elem);
                            setIsEditOpen(true);
                          }}
                          className="p-2 hover:text-blue-500 rounded-xl cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => deleteProduct(elem.id)}
                          className="p-2 hover:text-red-500 rounded-xl cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isAddOpen && (
        <AddProduct
          onClose={() => setIsAddOpen(false)}
          refreshProducts={fetchData}
        />
      )}
      {isEditOpen && (
        <EditProduct
          product={selectProduct}
          onClose={() => setIsEditOpen(false)}
          refreshProducts={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProduct;
