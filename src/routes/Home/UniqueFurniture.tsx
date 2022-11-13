import React from 'react'
import { useAppSelector } from '../../redux/hook';

const UniqueFurniture = () => {
  const {products} = useAppSelector(state => state.product);
  const uniqueFurniture: any = products.find(product => product.id === "09346776");

  if (uniqueFurniture === undefined) return null
  return (
    <div className='bg-[#f1f0ff]'>
      <div className='container mx-auto'>
        <div className='flex items-center'>
          <div className='flex items-center justify-center w-full'>
            <img src={uniqueFurniture.imagesByColor[uniqueFurniture.colors[0].name][0]} alt={uniqueFurniture.title} />
          </div>
          <div className='w-full ml-10'>
            <p className='text-navy-blue text-[35px] font-bold mb-4'>Unique Features Of leatest & Trending Poducts</p>
            <ul className='mb-4'>
              <li className='before:bg-[#F52B70] UF-list-marker'>
                {uniqueFurniture.specifications[0]}
              </li>
              <li className='before:bg-[#2B2BF5] UF-list-marker'>
                {uniqueFurniture.specifications[1]}
              </li>
              <li className='before:bg-[#2BF5CC] UF-list-marker'>
                {uniqueFurniture.specifications[2]}
              </li>
            </ul>
            <div className='mt-4 flex items-center'>
              <button className='font-JosefinSans text-base rounded-sm bg-pink-cc px-6 py-2 text-white'>Add To Cart</button>
              <div className='flex flex-col ml-4'>
                <p className='text-[14px] font-semibold font-JosefinSans text-navy-blue leading-4'>{uniqueFurniture.title}</p>
                <p className='font-Lato text-[14px] text-navy-blue leading-4'>${uniqueFurniture.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UniqueFurniture;