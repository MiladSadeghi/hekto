import React, { useEffect, useState } from "react";
import { Pagination } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { useAppSelector } from "../../redux/hook";
import { Product } from "../../types/IProducts.interface";
import TCCards from "../../components/TCCards";

import "swiper/css";
import "swiper/css/pagination";
import "../../styles/swipers.css";

const TopCategories = () => {
  const { products: Products } = useAppSelector((state) => state.product);
  const [topCategories, setTopCategories] = useState<Product[]>([]);

  useEffect(() => {
    const products: Product[] = Products.filter(
      (product: Product) => product.category === "Featured Products"
    );
    setTopCategories(products);
  }, [Products]);

  return (
    <div className="container mx-auto mt-24">
      <h1 className="font-JosefinSans text-center text-[#1A0B5B] text-[42px] font-bold mb-24">
        Top Categories
      </h1>

      <Swiper
        modules={[Pagination]}
        breakpoints={{
          640: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1280: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          1536: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
        }}
        spaceBetween={50}
        pagination={{ clickable: true }}
        className="mySwiper top-categories px-2"
      >
        {topCategories.map((product: Product) => (
          <SwiperSlide key={product.id}>
            <TCCards data={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopCategories;
