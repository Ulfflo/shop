// app/components/ClientLayout.js
"use client"; // This allows client-side functionality

import { Provider } from "react-redux";
import { store } from "../../store/store"; // Import your Redux store
import Header from "./Header";
import Footer from "./Footer";

export default function ClientLayout({ children }) {
  return (
    <Provider store={store}>
      <Header />
      <main>{children}</main>
      <Footer />
    </Provider>
  );
}
