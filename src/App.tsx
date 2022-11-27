import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { getProducts } from "./redux/slices/products";
import PagesRoute from "./routes/routes";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <Navbar />
      <PagesRoute />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
