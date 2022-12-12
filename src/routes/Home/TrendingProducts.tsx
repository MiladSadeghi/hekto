import React from "react";
import CCTPCards from "../../components/CCTPCards";
import { useAppSelector } from "../../redux/hook";
import watch from "../../images/watch-banner.png";
import buff from "../../images/buff-banner.png";
import EXTPCards from "../../components/EXTPCards";
import { Product } from "../../types/IProducts.interface";

const TrendingProducts = () => {
  const { products } = useAppSelector((state) => state.product);
  const cantileverChairs = products.filter(
    (product: Product) =>
      product.category === "Trending Products" &&
      product.section === "cantilever"
  );
  const executiveChairs = products.filter(
    (product: Product) =>
      product.category === "Trending Products" &&
      product.section === "executive"
  );

  return (
    <div className="container mx-auto mt-24">
      <h1 className="font-JosefinSans text-center text-[#1A0B5B] text-[42px] font-bold mb-6">
        Trending Products
      </h1>
      <div className="flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">
          {cantileverChairs.map((product: Product) => (
            <CCTPCards key={product.id} data={product} />
          ))}
        </div>
        <div className="grid grid-cols-8 gap-12">
          <div className="col-span-full md:col-span-4 lg:col-span-3 h-[270px] py-8 px-6 bg-[#fff6fb] relative">
            <h5 className="TP-banner-h5">23% off in all products</h5>
            <p className="TP-banner-p">Coming Soon</p>
            <img className="TP-banner-img" src={watch} alt="watch" />
          </div>
          <div className="col-span-full md:col-span-4 lg:col-span-3 h-[270px] py-8 px-6 bg-[#eeeffb] relative">
            <h5 className="TP-banner-h5">23% off in all collection</h5>
            <p className="TP-banner-p">Coming Soon</p>
            <img className="TP-banner-img" src={buff} alt="buff" />
          </div>
          <div className="lg:col-span-2 col-span-full">
            <div className="flex flex-col justify-between h-full">
              {executiveChairs.map((product: Product) => (
                <EXTPCards key={product.id} data={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
