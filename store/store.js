import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice"; // Importera cartSlice

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer, 
  },
});

export default store;
