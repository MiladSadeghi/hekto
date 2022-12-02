import React, { FC, ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import About from "./About";
import SignIn from "./Account/SignIn";
import SignUp from "./Account/SignUp";
import CartMain from "./Cart/main";
import Contact from "./Contact";
import Faq from "./Faq";
import Home from "./Home/main";
import NotFound from "./NotFound";
import ProductDetails from "./Products/ProductDetails";
import ProductsList from "./Products/ProductsList";
import Wishlist from "./Wishlist";

const PagesRoute: FC = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
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
  );
};

export default PagesRoute;
