"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../../store/slices/productSlice";
import { addItemToCart } from "../../../store/slices/cartSlice"; // Importera addItemToCart
import CartItem from "../../components/CartItem";
import Head from "next/head";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.selectedProduct);
  const status = useSelector((state) => state.products.productStatus);
  const error = useSelector((state) => state.products.productError);
  const [quantity, setQuantity] = useState(1);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  const handleAddToCart = () => {
    // Lägg till produkten i varukorgen genom Redux
    dispatch(
      addItemToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
      })
    );
    setIsCartModalOpen(true); // Öppna modalen efter tillägg
  };

  const closeModal = () => {
    setIsCartModalOpen(false);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return product ? (
    <>
      <Head>
        <title>{product.title} | The Frog Store</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta
          property="og:url"
          content={`https://shop-swart-phi.vercel.app/product/${id}`}
        />
        <meta property="og:type" content="product" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={product.title} />
        <meta property="twitter:description" content={product.description} />
        <meta property="twitter:image" content={product.image} />
      </Head>
      <div className="flex flex-col md:flex-row w-full text-black p-10 items-center">
        <div className="flex justify-center min-w-[300px] mr- w-[340px] px-4 mb-8 md:mb-0x">
          <img
            className="w-full object-cover"
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="flex flex-col bg-white p-4">
          <h1 className="mb-2 font-heading text-3xl">{product.title}</h1>
          <h3 className="text-lg font-bold">${product.price}</h3>
          <p className="text-gray-700 text-lg mb-4">{product.description}</p>
          <div className="text-sm text-gray-600 mb-2">
            Category: {product.category}
          </div>
          <div className="text-sm text-gray-600 mb-6">
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <div className="flex py-2 items-center font-bold text-gray-500 border border-gray-300 rounded-lg">
              <button
                className="h-full px-4 hover:bg-gray-100 focus:outline-none"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </button>
              <input
                className="w-9 text-center bg-transparent border-0 focus:ring-transparent focus:outline-none"
                type="numeric"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <button
                className="h-full px-4 hover:bg-gray-100 focus:outline-none"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              className="w-full md:w-auto bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              onClick={handleAddToCart} // Lägg till produkten i varukorgen
            >
              Add to cart
            </button>
          </div>
        </div>
        {isCartModalOpen && <CartItem closeModal={closeModal} />}
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default ProductPage;
