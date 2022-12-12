import React, { useEffect, useState } from "react";
import LPCards from "../../components/LPCards";
import { ELatestSection } from "../../enums/public.enum";
import { useAppSelector } from "../../redux/hook";
import { Product } from "../../types/IProducts.interface";

const LatestProducts = () => {
  const [section, setSection] = useState<ELatestSection>(
    ELatestSection.NewArrival
  );
  const { products: Products } = useAppSelector((state) => state.product);
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);

  useEffect(() => {
    const products: Product[] = Products.filter(
      (product: Product) =>
        product.category === "Leatest Products" && product.section === section
    );
    setLatestProducts(products);
  }, [section, Products]);

  if (latestProducts.length === 0) return null;
  return (
    <div className="container mx-auto">
      <h1 className="font-JosefinSans text-center text-[#1A0B5B] text-[42px] font-bold mb-10">
        Latest Products
      </h1>
      <div className="flex justify-center flex-wrap">
        {Object.values(ELatestSection).map((item: any, index: number) => (
          <p
            onClick={() => setSection(item)}
            className={`${
              item === section && "!text-pink-cc border-b-[1px] border-pink-cc"
            } mr-14 text-navy-blue last:mr-0 cursor-pointer `}
            key={index}
          >
            {item}
          </p>
        ))}
      </div>
      <div className="mt-7 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-20">
        {latestProducts.map((product: Product) => (
          <LPCards data={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
