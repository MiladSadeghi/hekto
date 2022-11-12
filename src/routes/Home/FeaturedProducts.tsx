import React, { FC, ReactElement, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import '../../styles/swipers.css';
import { useAppSelector } from '../../redux/hook';
import FPCards from '../../components/FPCards';

const FeaturedProducts:FC = ():ReactElement => {
  const {products} = useAppSelector(state => state.product);
  const [featuredProducts] = useState(() => 
    products.filter(item => item.category === "Featured Products")
  )
  
  return (
    <div className='container mx-auto mt-20 mb-10'>
      <h1 className='font-JosefinSans text-center text-[#1A0B5B] text-[42px] font-bold mb-10'>Featured Products</h1>
      <Swiper
        modules={[Pagination]}
        slidesPerView={4}
        slidesPerGroup={4}
        spaceBetween={0}
        pagination={{ clickable: true }}
        className="mySwiper featured-products"
      >
        {
          featuredProducts.map(product => (
            <SwiperSlide key={product.id}>
                <FPCards data={product} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default FeaturedProducts