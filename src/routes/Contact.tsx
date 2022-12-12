import React, { FC, ReactElement } from "react";
import { FaHeart, FaTelegram } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import ContactUsIMG from "../images/contact-us.png";
import { motion } from "framer-motion";

const Contact: FC = (): ReactElement => {
  document.title = "Hekto - Contact Us";
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
            Contact Us
          </h1>
        </div>
      </div>
      <div className="container mx-auto mt-32 mb-36">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full">
          <div className="w-full flex flex-col">
            <h5 className="text-4xl font-bold font-JosefinSans text-navy-blue mb-5">
              Information About us
            </h5>
            <p className="text-[#8A8FB9] font-Lato font-semibold font-base leading-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
              neque ultrices mattis aliquam, malesuada diam est. Malesuada sem
              tristique amet erat vitae eget dolor lobortis. Accumsan faucibus
              vitae lobortis quis bibendum quam.
            </p>
            <div className="flex mt-14">
              <div className="w-6 h-6 bg-[#5625DF] rounded-full mr-4" />
              <div className="w-6 h-6 bg-pink-cc rounded-full mr-4" />
              <div className="w-6 h-6 bg-[#37DAF3] rounded-full" />
            </div>
          </div>
          <div className="w-full">
            <h5 className="text-4xl font-bold font-JosefinSans text-navy-blue mb-5">
              Contact Way
            </h5>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
              <div className="flex w-full">
                <div className="min-w-[45px] min-h-[45px] bg-[#5726DF] mr-3 rounded-full" />
                <div className="flex flex-col my-auto">
                  <a
                    href="mailto:MiladSadeghi2323@gmail.com"
                    className="text-[#8A8FB9] flex items-center font-Lato font-semibold text-sm whitespace-nowrap"
                  >
                    <HiMail />: MiladSadeghi2323@gmail.com
                  </a>
                  <a
                    href="https://t.me/wsxxsw"
                    rel="noreferrer"
                    target="_blank"
                    className="text-[#8A8FB9] flex items-center font-Lato font-semibold text-sm"
                  >
                    <FaTelegram />: @wsxxsw
                  </a>
                </div>
              </div>
              <div className="flex w-full items-center">
                <div className="min-w-[45px] min-h-[45px] bg-pink-cc mr-3 rounded-full" />
                <p className="font-Lato font-semibold text-base text-[#8A8FB9] w-9/12 my-auto">
                  Support Forum For Over 24Hours
                </p>
              </div>
              <div className="flex w-full items-center">
                <div className="min-w-[45px] min-h-[45px] h-[45px] bg-[#FFB265] mr-3 rounded-full" />
                <p className="font-Lato font-semibold text-base text-[#8A8FB9] inline-block my-auto">
                  On Your Heart <FaHeart className="text-red-500 inline" />
                </p>
              </div>
              <div className="flex w-full items-center">
                <div className="min-w-[45px] min-h-[45px] bg-[#1BE982] mr-3 rounded-full" />
                <p className="font-Lato font-semibold text-base text-[#8A8FB9] w-9/12">
                  Free Standard Shipping On All Orders
                </p>
              </div>
            </div>
          </div>
          <div className="w-full mt-32">
            <h5 className="font-JosefinSans text-4xl font-bold text-navy-blue mb-5">
              Get In Touch
            </h5>
            <p className="text-[#8A8FB9] font-semibold font-Lato mb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
              neque ultrices tristique amet erat vitae eget dolor los vitae
              lobortis quis bibendum quam.
            </p>
            <div className="grid grid-cols-1 gap-10">
              <div className="grid grid-cols-2 gap-10">
                <input
                  type="text"
                  className="contact-in-touch"
                  placeholder="Your Name *"
                />
                <input
                  type="text"
                  className="contact-in-touch"
                  placeholder="Your E-mail"
                />
              </div>
              <input
                type="text"
                className="contact-in-touch"
                placeholder="Subject*"
              />
              <textarea
                className="contact-in-touch h-[166px] resize-none"
                placeholder="Type Your Message*"
              />
              <button className="text-white font-JosefinSans bg-pink-cc py-2 px-10 w-fit rounded-sm">
                Send Mail
              </button>
            </div>
          </div>
          <div className="w-full mt-32">
            <img src={ContactUsIMG} alt="contact us" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
