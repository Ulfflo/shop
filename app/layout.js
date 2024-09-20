"use client"

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}> <Header/> {children} <Footer/> </Provider>
      </body>
    </html>
  );
}
