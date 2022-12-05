// Featured Products Card

import React, { FC } from "react";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { SlMagnifierAdd } from "react-icons/sl";
import { Link } from "react-router-dom";
import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
} from "../helper/firebase.data";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { FCTypes } from "../types/public.types";

const LPCards: FC<FCTypes> = (props) => {
  const { data } = props;
  const { wishlist, uid } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

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
          <HiOutlineShoppingCart
            onClick={() => addToCart(uid, data.id, dispatch)}
            className="LPCard-hover-icon cursor-pointer"
          />
          {wishlist.includes(data.id) ? (
            <FaHeart
              onClick={() => removeFromWishlist(uid, data.id, dispatch)}
              className="LPCard-hover-icon cursor-pointer"
            />
          ) : (
            <FiHeart
              onClick={() => addToWishlist(uid, data.id, dispatch)}
              className="LPCard-hover-icon cursor-pointer"
            />
          )}
          <Link to={`product-details/${data.id}`}>
            <SlMagnifierAdd className="FPCard-hover-icon" />
          </Link>
        </div>
      </div>
      <div className="w-full flex items-center justify-between mt-3">
        <Link
          to={`product-details/${data.id}`}
          className="flex items-center justify-center"
        >
          <h5 className="line-clamp-1 w-8/12 font-JosefinSans font-same text-navy-blue">
            {data.title}
          </h5>
        </Link>
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
