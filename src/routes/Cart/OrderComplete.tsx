import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import doneIMG from "../../images/done.png";
import clockIMG from "../../images/clock.png";
import checkListIMG from "../../images/checklist.png";
import Logos from "../Home/Logos";
import { motion } from "framer-motion";

const OrderComplete: FC = (): ReactElement => {
  document.title = "Hekto - Order Complete";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: "100%",
        transition: { duration: 0.3 },
      }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="bg-[#F6F5FF] py-16">
        <div className="container mx-auto">
          <h1 className="font-JosefinSans font-bold text-3xl text-[#101750]">
            Order Completed
          </h1>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="my-32 flex flex-col items-center relative">
          <img src={doneIMG} alt="done" />
          <h6 className="text-4xl font-bold text-[#101750] font-JosefinSans mt-5 mb-7 text-center">
            Your Order Is Completed!
          </h6>
          <p className="font-semibold font-Lato text-[#8D92A7] w-6/12 text-center">
            Thank you for your order! Your order is being processed and will be
            completed within 3-6 hours. You will receive an email confirmation
            when your order is completed.
          </p>
          <Link
            to="/"
            className="py-3 px-10 bg-pink-cc text-white font-semibold font-Lato rounded-md mt-14"
          >
            Continue Shopping
          </Link>
          <img
            src={clockIMG}
            className="absolute left-0 top-10 -z-10"
            alt="clock icon"
          />
          <img
            src={checkListIMG}
            className="absolute -bottom-20 right-0"
            alt="checklist icon"
          />
        </div>
        <Logos />
      </div>
    </motion.div>
  );
};

export default OrderComplete;
