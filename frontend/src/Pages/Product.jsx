import { useParams } from "react-router-dom";
import ProductDIsplay from "../Components/ProductDIsplay/ProductDIsplay";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";

export const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/clothes/${productId}`,
      );
      setProduct(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoaderCircle className="animate-spin" size={50} />
      </div>
    );
  }

  if (!product) return <h1 className="text-center py-20">Product not found</h1>;
  return (
    <div>
      <ProductDIsplay product={product} />
    </div>
  );
};
