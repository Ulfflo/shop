"use client";

import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../store/slices/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "credit-card",
  });

  const totalCost = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      dispatch(decreaseQuantity(id));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <>
      <Head>
        <title>Cart | The Frog Store</title>
        <meta
          name="description"
          content="Review your cart and proceed to checkout."
        />
        <meta property="og:title" content="Your Cart | The Frog Store" />
        <meta
          property="og:description"
          content={`You have ${
            cart.length
          } items in your cart totaling $${totalCost.toFixed(2)}`}
        />
        <meta
          property="og:url"
          content="https://shop-swart-phi.vercel.app/cart"
        />
        <meta property="twitter:title" content="Your Cart | The Frog Store" />
        <meta
          property="twitter:description"
          content={`You have ${cart.length} items in your cart.`}
        />
      </Head>
      <div className="container mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-screen">
          <h1 className="text-3xl font-bold mb-4">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left section: Cart overview */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
              <div className="bg-white shadow rounded-lg p-4">
                {cart.length === 0 ? (
                  <p className="text-gray-700">Your cart is empty</p>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row space-y-4 sm:space-y-0"
                      >
                        {/* Container for image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-contain"
                          />
                        </div>

                        {/* Container for title and quantity controls */}
                        <div className="flex-1 flex flex-col justify-between ml-4">
                          {/* Title */}
                          <div className="mb-2">
                            <p className="text-gray-700 font-bold">
                              {item.title}
                            </p>
                          </div>

                          {/* Quantity controls */}
                          <div
                            className="flex items-center font-bold text-gray-500 border border-gray-300 rounded-lg p-1"
                            style={{ width: "fit-content" }}
                          >
                            <button
                              className="w-4 h-4 flex items-center justify-center hover:bg-gray-100 focus:outline-none"
                              onClick={() =>
                                handleDecreaseQuantity(item.id, item.quantity)
                              }
                              disabled={item.quantity === 1}
                            >
                              -
                            </button>

                            <input
                              className="w-10 text-center bg-transparent border-0 focus:ring-transparent focus:outline-none mx-2"
                              type="text"
                              value={item.quantity}
                              readOnly
                            />

                            <button
                              className="w-4 h-4 flex items-center justify-center hover:bg-gray-100 focus:outline-none"
                              onClick={() => handleIncreaseQuantity(item.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Container for price */}
                        <div className="flex-shrink-0 flex items-center">
                          <p className="text-gray-700 mr-4">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Container for trash can button */}
                        <div className="flex-shrink-0 flex items-center">
                          <button
                            className="text-gray-700"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between font-bold text-lg mt-4">
                      <span>Total:</span>
                      <span>${totalCost.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right section: Shipping information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Shipping Information
              </h2>
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow rounded-lg p-6"
              >
                <div className="mb-4">
                  <label htmlFor="fullName" className="block text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="address" className="block text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label htmlFor="city" className="block text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={form.city}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="postalCode" className="block text-gray-700">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={form.postalCode}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="country" className="block text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={form.country}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="paymentMethod"
                    className="block text-gray-700"
                  >
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                  >
                    <option value="credit-card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="swish">Swish</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
