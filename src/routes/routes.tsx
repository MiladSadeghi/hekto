import { AnimatePresence } from "framer-motion";
import React, { FC, ReactElement } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import About from "./About";
import SignIn from "./Account/SignIn";
import SignUp from "./Account/SignUp";
import CartMain from "./Cart/main";
import Contact from "./Contact";
import Faq from "./Faq";
import Home from "./Home/Home";
import NotFound from "./NotFound";
import PrivateRoute from "./PrivateRoute";
import ProductDetails from "./Products/ProductDetails";
import ProductsList from "./Products/ProductsList";
import Wishlist from "./Wishlist";

const PagesRoute: FC = (): ReactElement => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route
          path="/signin"
          element={
            <PrivateRoute>
              <SignIn />
            </PrivateRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PrivateRoute>
              <SignUp />
            </PrivateRoute>
          }
        />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/products/*" element={<ProductsList />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<CartMain />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </AnimatePresence>
  );
};

export default PagesRoute;
