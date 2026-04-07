import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { LoaderCircle, UserPen, Trash2, UsersIcon } from "lucide-react";
import EditUser from "./EditUser";

const Users = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(`Are You Sure To Delete User ? `);

    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("User Delete Successfully");

      setData((prev) => prev.filter((user) => user.id !== id));
    } catch {
      toast.error("Faild to Delete User");
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch user data");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between py-4 ">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
          <UsersIcon size={20} />
          <span className="font-semibold">{data.length} Total Users</span>
        </div>
      </div>

      <div className="border border-gray-200 rounded-2xl shadow-sm overflow-hidden h-152">
        <div className="max-h-screen overflow-y-auto hide-scrollbar">
          <table className="w-full text-left">
            <thead className="bg-gray-50/80 border-b border-gray-200">
              <tr className="text-[15px] font-bold uppercase">
                <th className="px-6 py-4">Id</th>
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <div className="flex flex-col justify-center items-center ">
                      <LoaderCircle className="w-10 h-10 text-black animate-spin" />
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <UsersIcon className="w-8 h-8" />
                      </div>
                      <p>No users found</p>
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
                      <div className="flex flex-col">
                        <span>{elem.name}</span>
                        <span>{elem.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{elem.address}</td>
                    <td className="px-6 py-4">{elem.phone}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-5 ">
                        <button
                          onClick={() => {
                            setSelectedUser(elem);
                            setIsEditOpen(true);
                          }}
                          className="hover:text-blue-600 cursor-pointer"
                          title="Edit User"
                        >
                          <UserPen size={20} />
                        </button>
                        <button
                          onClick={() => deleteUser(elem.id)}
                          className="hover:text-red-600 cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 size={19} />
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
      {isEditOpen && (
        <EditUser
          user={selectedUser}
          onClose={() => setIsEditOpen(false)}
          refreshUser={fetchData}
        />
      )}
    </div>
  );
};

export default Users;
