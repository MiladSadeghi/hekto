import React from 'react'
import FeaturedProducts from './FeaturedProducts';
import Header from './header';
import LatestProducts from './LatestProducts';
import ShopOffers from './ShopOffers';
import TrendingProducts from './TrendingProducts';
import UniqueFurniture from './UniqueFurniture';

const Home = () => {
  return (
    <>
      <Header />
      <FeaturedProducts />
      <LatestProducts />
      <ShopOffers />
      <UniqueFurniture />
      <TrendingProducts />
    </>
  )
}

export default Home;