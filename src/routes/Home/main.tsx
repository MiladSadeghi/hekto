import React from 'react'
import FeaturedProducts from './FeaturedProducts';
import Header from './header';
import LatestProducts from './LatestProducts';
import ShopOffers from './ShopOffers';

const Home = () => {
  return (
    <>
      <Header />
      <FeaturedProducts />
      <LatestProducts />
      <ShopOffers />
    </>
  )
}

export default Home;