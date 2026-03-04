import { useEffect } from "react";
import { createContext, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/clothes")
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, []);

  const addToCart = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1,
    }));
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[id] > 1) {
        updated[id] -= 1;
      } else {
        delete updated[id];
      }
      return updated;
    });
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((a, b) => a + b, 0);
  };

  const getTotalCartAmount = () => {
    let total = 0;

    for (const id in cartItems) {
      const product = products.find((p) => String(p.id) === id);
      if (product) {
        total += Number(product.discountPrice) * cartItems[id];
      }
    }

    return total;
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const contextValue = {
    cartItems,
    products,
    getTotalCartItems,
    getTotalCartAmount,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
