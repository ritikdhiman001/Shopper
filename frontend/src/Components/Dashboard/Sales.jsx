const Sales = () => {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-center justify-between py-4">
        <div className="text-3xl font-bold">
          <h1>Payments</h1>
        </div>
      </div>

      <div className="border border-gray-300 rounded-2xl shadow-sm overflow-hidden h-152">
        <div className="max-h-screen overflow-y-auto hide-scrollbar">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-[15px] font-bold uppercase">
                <th className="px-6 py-5">Payment Id</th>
                <th className="px-6 py-5">User</th>
                <th className="px-6 py-5">Product</th>
                <th className="px-6 py-5">Price</th>
                <th className="px-6 py-5">Date</th>
                <th className="px-6 py-5">Payment Status</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sales;
