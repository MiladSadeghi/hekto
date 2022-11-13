import React, { useEffect, useState } from 'react'
import LPCards from '../../components/LPCards';
import { useAppSelector } from '../../redux/hook';
import { Product } from '../../types/IProducts.interface';

const LatestProducts = () => {

  const [section, setSection] = useState<String>("New Arrival");
  const sections = ["New Arrival", "Best Seller", "Featured", "Special Offer"];
  const {products: Products} = useAppSelector(state => state.product);
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);

  useEffect(() => {
    const products: Product[] = Products.filter(product => product.category === "Leatest Products" && product.section === section);
    setLatestProducts(products);
  }, [section, Products])

  if (latestProducts.length === 0) return null;
  return (
    <div className='container mx-auto'>
      <h1 className='font-JosefinSans text-center text-[#1A0B5B] text-[42px] font-bold mb-10'>Latest Products</h1>
      <div className='flex justify-center'>
        {sections.map((item, index) => (
          <p onClick={() =>setSection(item)} className={`${item === section && '!text-pink-cc border-b-[1px] border-pink-cc'} mr-14 text-navy-blue last:mr-0 cursor-pointer `} key={index}>{item}</p>
        ))}
      </div>
      <div className='mt-7 grid grid-cols-3 gap-x-10 gap-y-20'>
        {
          latestProducts.map(product => 
            <LPCards data={product} key={product.id} />
          )
        }
      </div>
    </div>
  )
}

export default LatestProducts;