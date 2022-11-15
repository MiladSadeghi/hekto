import React, { useState } from 'react'
import { Pagination } from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import { useAppSelector } from '../../redux/hook';

import 'swiper/css';
import 'swiper/css/pagination';
import '../../styles/swipers.css';
import TCCards from '../../components/TCCards';

const TopCategories = () => {
  const {products} = useAppSelector(state => state.product);
  const [featuredProducts] = useState(() => 
    products.filter(item => item.category === "Top Categories")
  )

  return (
    <div className='container mx-auto mt-24'>
      <h1 className='font-JosefinSans text-center text-[#1A0B5B] text-[42px] font-bold mb-24'>Top Categories</h1>
      <Swiper
        modules={[Pagination]}
        slidesPerView={4}
        slidesPerGroup={4}
        spaceBetween={50}
        pagination={{ clickable: true }}
        className="mySwiper top-categories px-2"
      >
        {
          featuredProducts.map(product => (
            <SwiperSlide key={product.id}>
                <TCCards data={product} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default TopCategories