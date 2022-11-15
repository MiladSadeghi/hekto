import React from 'react'
import DiscountItems from './DiscountItems';
import FeaturedProducts from './FeaturedProducts';
import Header from './header';
import LatestProducts from './LatestProducts';
import Logos from './Logos';
import ShopOffers from './ShopOffers';
import TopCategories from './TopCategories';
import TrendingProducts from './TrendingProducts';
import UniqueFurniture from './UniqueFurniture';
import UpdateBanner from './UpdateBanner';

const Home = () => {
  return (
    <>
      <Header />
      <FeaturedProducts />
      <LatestProducts />
      <ShopOffers />
      <UniqueFurniture />
      <TrendingProducts />
      <DiscountItems />
      <TopCategories />
      <UpdateBanner />
      <Logos />
    </>
  )
}

export default Home;