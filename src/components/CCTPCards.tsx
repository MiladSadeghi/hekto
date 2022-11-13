import React, { FC, ReactElement } from 'react'
import { FCTypes } from '../types/public.types';

const CCTPCards:FC<FCTypes> = (props):ReactElement => {
  const {data} = props;

  return (
    <div className='flex flex-col p-4 bg-white drop-shadow-[0_8px_40px_rgba(49,32,138,0.05)]' >
      <div className='w-full h-[244px] flex items-center justify-center bg-[#F5F6F8]'>
        <img src={data.imagesByColor !== undefined ? data.imagesByColor[data.colors[0].name][0] : data.images[0]} alt={String(data.id)} className="w-[171px] h-[171px]" />
      </div>
      <div className='flex flex-col justify-center items-center mt-2'>
        <h3 className='line-clamp-1 font-Lato text-base text-center font-bold text-navy-blue w-11/12 mb-2'>{data.title}</h3>
        <div>
          <p className='font-JosefinSans text-sm text-navy-blue'>${data.price}</p>
        </div>
      </div>
    </div>
  )
}

export default CCTPCards