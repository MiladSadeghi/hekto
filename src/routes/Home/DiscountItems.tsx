import React, { useEffect, useState } from 'react'
import { discountSection } from '../../enums/public.enum';
import { useAppSelector } from '../../redux/hook';
import {BiCheck} from "react-icons/bi";
import { Product } from '../../types/IProducts.interface';

const DiscountItems = () => {
  const [section, setSection] = useState<discountSection>(discountSection.WoodChair);
  const {products} = useAppSelector(state => state.product);
  const [discountItem, setDiscountItem] = useState<any>([])

  function changeItem(section: string):any {
    return products.filter((product: Product) => product.category === 'Discount Item' && product.section === section)
  }

  useEffect(() => {
    setDiscountItem(changeItem(section));
  }, [section])

  if (!!!discountItem.length) return null
  return (
    <div className='container mx-auto mt-10'>
      <h1 className='font-JosefinSans text-center text-[#1A0B5B] text-[42px] font-bold mb-10'>Discount Item</h1>
      <div className='text-center mb-10'>
        {
          Object.values(discountSection).map((item, index) => (
            <span onClick={() => setSection(item)} key={item} className={`mr-10 last:mr-0 text-lg font-Lato text-navy-blue ${item === section && 'DI-selected'}`}>
              {item}
            </span>
          ))
        }
      </div>
      <div className='flex gap-12'>
        <div className='w-full flex flex-col justify-center'>
          <h5 className='font-JosefinSans text-navy-blue text-[35px] font-bold'>20% Discount Of All Products</h5>
          <h4 className='font-JosefinSans text-[21px] text-pink-cc mt-2 mb-7'>{discountItem[0].title}</h4>
          <p className='font-Lato text-[17px] text-[#B7BACB] mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu eget feugiat habitasse nec, bibendum condimentum.</p>
          <div className='grid grid-cols-2 gap-5'>
            {
              discountItem[0]?.specifications.slice(0,4).map((item: string) => (
                <div className='flex' key={item}>
                  <BiCheck className=' text-2xl text-[#7569B2]' />
                  <p className='w-full ml-2 text-[#B8B8DC]'>{item}</p>
                </div>
              ))
            }
          </div>
          <button className='px-14 py-3 bg-pink-cc w-fit font-JosefinSans text-[17px] text-white rounded-sm mt-7 cursor-pointer'>
            Shop Now
          </button>
        </div>
        <div className='w-full'>
          <img src={discountItem[0].imagesByColor ? 
          discountItem[0].imagesByColor[discountItem[0].colors[0].name][1] :
          discountItem[0].images[1]
          } alt="" />
        </div>
      </div>
    </div>
  )
}

export default DiscountItems