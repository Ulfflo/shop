"use client"

import { createSlice } from "@reduxjs/toolkit";

// Helper function to push events to dataLayer
const pushToDataLayer = (event, ecommerceData) => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: event,
      ecommerce: ecommerceData,
    });
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      const itemInCart = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity += action.payload.quantity;
        // Push updated quantity to dataLayer
        pushToDataLayer("addToCart", {
          items: [
            {
              item_id: itemInCart.id,
              item_name: itemInCart.title,
              price: itemInCart.price,
              quantity: itemInCart.quantity,
            },
          ],
        });
      } else {
        state.items.push({ ...action.payload });
        // Push new item to dataLayer
        pushToDataLayer("addToCart", {
          items: [
            {
              item_id: action.payload.id,
              item_name: action.payload.title,
              price: action.payload.price,
              quantity: action.payload.quantity,
            },
          ],
        });
      }
    },

    removeItemFromCart: (state, action) => {
      const removedItem = state.items.find(
        (item) => item.id === action.payload
      );
      state.items = state.items.filter((item) => item.id !== action.payload);
      // Push remove event to dataLayer
      if (removedItem) {
        pushToDataLayer("removeFromCart", {
          items: [
            {
              item_id: removedItem.id,
              item_name: removedItem.title,
              price: removedItem.price,
              quantity: removedItem.quantity,
            },
          ],
        });
      }
    },

    clearCart: (state) => {
      // Push clear cart event to dataLayer
      pushToDataLayer("clearCart", {
        items: state.items.map((item) => ({
          item_id: item.id,
          item_name: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
      });
      state.items = [];
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
        // Push quantity increase event to dataLayer
        pushToDataLayer("updateCart", {
          items: [
            {
              item_id: item.id,
              item_name: item.title,
              price: item.price,
              quantity: item.quantity,
            },
          ],
        });
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        // Push quantity decrease event to dataLayer
        pushToDataLayer("updateCart", {
          items: [
            {
              item_id: item.id,
              item_name: item.title,
              price: item.price,
              quantity: item.quantity,
            },
          ],
        });
      }
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
