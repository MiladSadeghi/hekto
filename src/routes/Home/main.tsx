import React from 'react'
import FeaturedProducts from './FeaturedProducts';
import Header from './header';
import LatestProducts from './LatestProducts';
import ShopOffers from './ShopOffers';
import UniqueFurniture from './UniqueFurniture';

const Home = () => {
  return (
    <>
      <Header />
      <FeaturedProducts />
      <LatestProducts />
      <ShopOffers />
      <UniqueFurniture />
    </>
  )
}

export default Home;