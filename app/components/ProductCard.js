// app/components/ProductCard.js
"use client"; // Markera som klientkomponent om den använder useState eller andra klientfunktioner

import Link from "next/link";

const ProductCard = ({ product }) => {
  const limitedTitle = product.title.split(" ").slice(0, 3).join(" ");

  return (
    <Link href={`/product/${product.id}`}>
      <div className="border p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <img
          src={product.image}
          alt={limitedTitle}
          className="w-full h-40 object-contain mb-4"
        />
        <h2 className="text-gray-700 text-md font-semibold mb-2">
          {limitedTitle}
        </h2>
        <p className="text-gray-700 mb-2">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
