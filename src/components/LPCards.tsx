// Featured Products Card

import React, { FC } from "react";
import { FiHeart } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { SlMagnifierAdd } from "react-icons/sl";
import { FCTypes } from "../types/public.types";

const LPCards: FC<FCTypes> = (props) => {
  const { data } = props;

  return (
    <div className="flex flex-col group">
      <div className="flex justify-center items-center h-[270px] LPCard-hover-image">
        <img
          className="w-[223px] h-[229px]"
          src={
            data.imagesByColor
              ? data.imagesByColor[data.colors!![0].name][0]
              : data.images[0]
          }
          alt={data.title}
        />
        <div className="LPCard-hover-icons">
          <HiOutlineShoppingCart className="LPCard-hover-icon" />
          <FiHeart className="LPCard-hover-icon" />
          <SlMagnifierAdd className="LPCard-hover-icon" />
        </div>
      </div>
      <div className="w-full flex items-center justify-between mt-3">
        <h3 className="line-clamp-1 w-8/12 font-JosefinSans font-same text-navy-blue">
          {data.title}
        </h3>
        <div className="flex items-center justify-center mr-3">
          <p
            className={`${
              !data.discount && "hidden"
            } font-JosefinSans text-sm text-navy-blue`}
          >
            ${data?.discount}
          </p>
          <p
            className={`${
              data.discount && "line-through text-red-cc text-xs ml-3"
            } text-sm text-navy-blue font-JosefinSans`}
          >
            ${data.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LPCards;
