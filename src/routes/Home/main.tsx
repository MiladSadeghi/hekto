import React from 'react'
import FeaturedProducts from './FeaturedProducts';
import Header from './header';
import LatestProducts from './LatestProducts';

const Home = () => {
  return (
    <>
      <Header />
      <FeaturedProducts />
      <LatestProducts />
    </>
  )
}

export default Home;