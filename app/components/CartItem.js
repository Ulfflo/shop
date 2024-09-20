"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../store/slices/cartSlice";

const CartItem = ({ closeModal }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const router = useRouter();

  const handleCheckout = () => {
    closeModal();
    router.push("/cart");
  };

  const handleContinueShopping = () => {
    closeModal();
    router.push("/");
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      dispatch(decreaseQuantity(id));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative overflow-y-auto max-h-screen">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-700">Your cart is empty</p>
        ) : (
          <>
            <div className="cart-items mb-6 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between space-x-4"
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain"
                  />

                  {/* Quantity Controls */}
                  <div className="flex-1 flex items-center justify-between ml-4">
                    <div className="flex items-center font-bold text-gray-500 border border-gray-300 rounded-lg">
                      {/* Decrease button */}
                      <button
                        className="h-full px-4 hover:bg-gray-100 focus:outline-none"
                        onClick={() =>
                          handleDecreaseQuantity(item.id, item.quantity)
                        }
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>

                      {/* Display quantity */}
                      <input
                        className="w-4 text-center bg-transparent border-0 focus:ring-transparent focus:outline-none mx-2"
                        type="text"
                        value={item.quantity}
                        readOnly
                      />

                      {/* Increase button */}
                      <button
                        className="h-full px-4 hover:bg-gray-100 focus:outline-none"
                        onClick={() => handleIncreaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <p className="text-gray-700 font-semibold ml-10 mr-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Trash can button */}
                    <button
                      className="text-gray-700 ml-4 flex items-center"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                Total: ${totalPrice.toFixed(2)}
              </h3>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}

        <div className="flex justify-between">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400"
            onClick={handleCheckout}
          >
            Go to Checkout
          </button>
        </div>

        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default CartItem;
