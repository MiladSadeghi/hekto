import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { FCTypes } from "../types/public.types";

const EXTPCards: FC<FCTypes> = (props): ReactElement => {
  const { data } = props;

  return (
    <div className="flex">
      <div className="bg-[#f5f6f8] min-w-[107px] min-h-[74px] flex items-center justify-center">
        <img
          src={
            data.imagesByColor
              ? data.imagesByColor[data.colors!![0].name][0]
              : data.images[0]
          }
          alt=""
          className="w-[64px] h-[71px] object-contain"
        />
      </div>
      <div className="flex flex-col ml-2 justify-center h-full">
        <Link to={`product-details/${data.id}`}>
          <h5 className="line-clamp-1 leading-4 text-base mb-2 w-12/12 text-navy-blue font-semibold">
            {data.title}
          </h5>
        </Link>
        <p className="leading-3 font-JosefinSans text-sm text-navy-blue">
          ${data.price}
        </p>
      </div>
    </div>
  );
};

export default EXTPCards;
