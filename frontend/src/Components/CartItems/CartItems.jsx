import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";

export const CartItems = () => {
  const { getTotalCartAmount, products, cartItems, removeFromCart, addToCart } =
    useContext(ShopContext);

  const totalAmount = getTotalCartAmount();
  const hasItems = totalAmount > 0;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-20">
      {!hasItems ? (
        <div className="py-20 text-center bg-white shadow-sm rounded-xl border border-gray-200">
          <p className="text-gray-500 text-lg">Your cart is currently empty.</p>
          <Link
            to="/"
            className="mt-4 text-blue-600 font-semibold hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="hidden md:grid grid-cols-[2fr_1fr_1.5fr_1fr] gap-4 p-6 bg-gray-50/50 border-b border-gray-100 text-sm font-semibold text-gray-600">
              <p>Product</p>
              <p className="text-center">Price</p>
              <p className="text-center">Quantity</p>
              <p className="text-right">Total</p>
            </div>

            <div className="divide-y divide-gray-100">
              {products.map((e) => {
                if (cartItems[e.id] > 0) {
                  return (
                    <div
                      key={e.id}
                      className="p-6 grid grid-cols-1 md:grid-cols-[2fr_1fr_1.5fr_1fr] items-center gap-6"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={e.image}
                          alt="img"
                          className="w-16 h-16 object-contain rounded-md border border-gray-100 p-1"
                        />
                        <p className="font-medium text-gray-900">{e.name}</p>
                      </div>

                      <p className="text-center text-gray-600">
                        ₹{e.discountPrice}
                      </p>

                      <div className="flex justify-center">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-10">
                          <button
                            onClick={() => removeFromCart(e.id)}
                            className="px-3 hover:bg-gray-50 text-gray-400 transition-colors"
                          >
                            -
                          </button>
                          <span className="px-4 font-medium text-sm border-x border-gray-200 h-full flex items-center">
                            {cartItems[e.id]}
                          </span>
                          <button
                            onClick={() => addToCart(e.id)}
                            className="px-3 hover:bg-gray-50 text-gray-400 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <p className="font-semibold text-gray-900">
                          ₹{e.discountPrice * cartItems[e.id]}
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-50 pb-4">
              Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">
                  ₹{totalAmount}
                </span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Shipping</span>
                <span className="text-green-600 font-bold uppercase text-[10px] bg-green-50 px-2 py-0.5 rounded">
                  Free
                </span>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-xl font-black text-gray-900">
                  ₹{totalAmount.toFixed(2)}
                </span>
              </div>
              <button className="w-full bg-black text-white py-3.5 rounded-lg font-bold transition-all active:scale-[0.98] mt-6 shadow-md shadow-blue-100 cursor-pointer active:scale-95">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
