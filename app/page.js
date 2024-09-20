"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./components/ProductCard";
import { fetchProducts } from "../store/slices/productSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  // Hämta produkterna och status från Redux store
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    // Dispatcha thunk för att hämta produkter vid komponentmount
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Eventuell hantering av status
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

 

  return (
    <div className="bg-white py-12 px-4 sm:px-8 lg:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Rendera produkterna */}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
