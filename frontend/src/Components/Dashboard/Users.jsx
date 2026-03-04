import { useState } from "react";

const Users = () => {
  const [data, setData] = useState([]);

  const myfun = ()=>{
    
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border">Test User</td>
            <td className="p-2 border">test@gmail.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Users;
