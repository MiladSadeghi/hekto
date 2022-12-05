import React from "react";
import DiscountItems from "./DiscountItems";
import FeaturedProducts from "./FeaturedProducts";
import Header from "./Header";
import LatestProducts from "./LatestProducts";
import Logos from "./Logos";
import ShopOffers from "./ShopOffers";
import TopCategories from "./TopCategories";
import TrendingProducts from "./TrendingProducts";
import UniqueFurniture from "./UniqueFurniture";
import UpdateBanner from "./UpdateBanner";

const Home = () => {
  document.title = "Hekto";
  return (
    <>
      <Header />
      <FeaturedProducts />
      <LatestProducts />
      <ShopOffers
        sectionTitle="What's Hekto Offer?"
        classes="font-JosefinSans text-center text-[#1A0B5B] text-[42px] font-bold mb-20"
      />
      <UniqueFurniture />
      <TrendingProducts />
      <DiscountItems />
      <TopCategories />
      <UpdateBanner />
      <Logos />
    </>
  );
};

export default Home;
