import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProductDisplay = ({ product }) => {
  const { addToCart, cartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  if (!product) return null;

  const { id, image, name, discountPrice, price, description } = product;
  const discount = Math.round(((price - discountPrice) / price) * 100);

  const handleCartClick = () => {
    if (!cartItems[id]) {
      addToCart(id);
      toast.success("Item Added Successfull");
    } else {
      navigate("/cart");
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-auto">
        <div className="flex items-center justify-center p-6 md:p-10 bg-[#f8f8f8] lg:bg-transparent">
          <img
            src={image}
            alt={name}
            className="w-full max-w-sm md:max-w-md lg:max-h-140 object-contain drop-shadow-2xl"
          />
        </div>
        <div className="p-6 md:p-10 lg:p-20 flex flex-col justify-center">
          {discount > 0 && (
            <span className="text-orange-600 font-bold text-sm mb-2 uppercase tracking-widest">
              Save {discount}%
            </span>
          )}

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
            {name}
          </h1>

          <div className="flex items-center gap-4 mt-4 md:mt-6">
            <span className="text-2xl md:text-4xl font-bold text-black">
              ₹{Number(discountPrice).toLocaleString()}
            </span>

            <span className="text-gray-400 line-through text-base md:text-xl">
              ₹{Number(price).toLocaleString()}
            </span>
          </div>
          <div className="py-4 text-gray-600 mt-4 md:mt-6 text-sm md:text-lg leading-relaxed ">
            <p>{description}</p>
          </div>

          <button
            onClick={handleCartClick}
            className="mt-8 bg-red-500 hover:bg-red-600 text-white py-4 px-8 rounded-xl font-semibold tracking-wider uppercase cursor-pointer active:scale-95 transition-transform w-full lg:w-max"
          >
            {cartItems[id] ? "Go To Cart" : "Add To Cart"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
