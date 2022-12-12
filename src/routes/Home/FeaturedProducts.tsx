import React, { FC, ReactElement, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "../../styles/swipers.css";
import { useAppSelector } from "../../redux/hook";
import FPCards from "../../components/FPCards";
import { Product } from "../../types/IProducts.interface";

const FeaturedProducts: FC = (): ReactElement | null => {
  const { products: Products } = useAppSelector((state) => state.product);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const products: Product[] = Products.filter(
      (product: Product) => product.category === "Featured Products"
    );
    setFeaturedProducts(products);
  }, [Products]);

  return (
    <div className="container mx-auto mt-20 mb-14">
      <h1 className="font-JosefinSans text-center text-[#1A0B5B] text-[42px] font-bold mb-10">
        Featured Products
      </h1>
      <Swiper
        modules={[Pagination]}
        breakpoints={{
          320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          640: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
        }}
        spaceBetween={0}
        pagination={{ clickable: true }}
        className="mySwiper featured-products"
      >
        {featuredProducts.map((product: Product) => (
          <SwiperSlide key={product.id}>
            <FPCards data={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedProducts;
