// Featured Products Card

import React, { FC, ReactElement } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { SlMagnifierAdd } from "react-icons/sl";
import { FiHeart } from "react-icons/fi";
import { FCTypes } from "../types/public.types";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
} from "../redux/slices/user";

const FPCards: FC<FCTypes> = (props): ReactElement => {
  const { data } = props;
  const { wishlist, uid } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <div className="w-[95%] group overflow-hidden">
      <div className="w-full h-[236px] flex items-center justify-center FPCard-hover-image relative">
        <img
          className="w-[176px] h-[176px]"
          src={
            data.imagesByColor
              ? data.imagesByColor[data.colors!![0].name][0]
              : data.images[0]
          }
          alt={data.title}
        />
        <div className="FPCard-hover-icons">
          <HiOutlineShoppingCart
            onClick={() => dispatch(addToCart({ productID: data.id }))}
            className="FPCard-hover-icon cursor-pointer"
          />
          {wishlist.includes(data.id) ? (
            <FaHeart
              onClick={() =>
                dispatch(removeFromWishlist({ productID: data.id }))
              }
              className="FPCard-hover-icon cursor-pointer"
            />
          ) : (
            <FiHeart
              onClick={() => dispatch(addToWishlist({ productID: data.id }))}
              className="FPCard-hover-icon cursor-pointer"
            />
          )}
          <Link to={`product-details/${data.id}`}>
            <SlMagnifierAdd className="FPCard-hover-icon" />
          </Link>
        </div>
        <Link to={`product-details/${data.id}`} className="FPCard-hover-button">
          View Details
        </Link>
      </div>
      <div className="flex items-center flex-col p-4 text-center FPCard-hover-body">
        <Link
          to={`product-details/${data.id}`}
          className="flex items-center justify-center"
        >
          <h5 className="line-clamp-1 text-pink-cc text-[18px] font-bold FPCard-hover-text">
            {data.title}
          </h5>
        </Link>
        <div className="flex mt-3 h-1">
          {data.colors &&
            data.colors?.map((color: any) => (
              <div
                key={color.code}
                className={`w-[14px] h-[4px] mr-2 rounded-lg`}
                style={{ backgroundColor: color.code }}
              />
            ))}
        </div>
        <p className="font-JosefinSans text-[14px] text-navy-blue mt-3 FPCard-hover-text">
          Code - {data.id}
        </p>
        <div className="mt-3 text-center w-full">
          {data.discount ? (
            <div className="flex item-center justify-around text-navy-blue FPCard-hover-text">
              <p className="line-through font-Lato text-[14px]">
                ${data.price}
              </p>
              <p className="font-Lato text-[14px]">${data.discount}</p>
            </div>
          ) : (
            <p className="text-[14px] text-navy-blue FPCard-hover-text">
              ${data.price}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FPCards;
