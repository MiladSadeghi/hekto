import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import '../../styles/swipers.css';

const Header = () => {
  return (
    <>
      <Swiper
      modules={[Pagination]}
      slidesPerView={1}
      pagination={{ clickable: true }}
      className="mySwiper header"
      >
        <SwiperSlide>
          <img src="https://firebasestorage.googleapis.com/v0/b/hekto-a75a2.appspot.com/o/first-banner.png?alt=media&token=375bdc40-e2eb-44ae-926b-db8aaabf2232" alt="first banner" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://firebasestorage.googleapis.com/v0/b/hekto-a75a2.appspot.com/o/second-banner.png?alt=media&token=ed82b709-32a5-454e-8a97-ea7ec8469f4f" alt="second banner" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://firebasestorage.googleapis.com/v0/b/hekto-a75a2.appspot.com/o/third-banner.png?alt=media&token=f1479f3a-b3dc-48f2-bb44-2def0904debc" alt="third banner" />
        </SwiperSlide>
      </Swiper>
    
    </>
  )
}

export default Header;