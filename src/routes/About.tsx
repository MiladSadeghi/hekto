import React, { FC, ReactElement, useState } from "react";
import ManagementIMG from "../images/management-about.png";
import ShopOffers from "./Home/ShopOffers";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import client1 from "../images/client-1.png";
import client2 from "../images/client-2.png";
import client3 from "../images/client-3.png";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "../styles/swipers.css";

const About: FC = (): ReactElement => {
  const [commentSlide, setCommentSlide] = useState<number>(1);
  document.title = "Hekto - About Us";
  const clientDetails = [
    {
      name: "Sam Bankman-Fried",
      position: "Ceo At FTX",
    },
    {
      name: "Selina Gomez",
      position: "Ceo At Webecy Digital",
    },
    {
      name: "Guy Gershon",
      position: "Senior Technical Product Manager",
    },
  ];

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
            About Us
          </h1>
        </div>
      </div>
      <div className="container mx-auto mt-32 mb-36">
        <div className="flex w-full mb-28 gap-8 flex-col md:flex-row">
          <div className="w-full">
            <div className="relative before:absolute before:top-0 before:right-4 before:bg-navy-blue before:w-[98.7%] before:h-[104%] before:rounded-md m-auto before:-z-10 before:hidden md:before:block">
              <img className="w-full" src={ManagementIMG} alt="management" />
            </div>
          </div>
          <div className="w-full">
            <h4 className="font-JosefinSans text-4xl font-bold text-navy-blue mb-6">
              Know About Our ECommerce Business, History
            </h4>
            <p className="text-[#8A8FB9] font-base font-semibold font-Lato mb-12">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
              neque ultrices mattis aliquam, malesuada diam est. Malesuada sem
              tristique amet erat vitae eget dolor lobortis. Accumsan faucibus
              vitae lobortis quis bibendum quam.
            </p>
            <button className="py-2 px-7 bg-pink-cc text-white rounded-sm font-Lato text-lg font-semibold">
              Contact us
            </button>
          </div>
        </div>
        <div className="">
          <ShopOffers
            sectionTitle="Our Features"
            classes="text-center font-JosefinSans font-bold text-[42px] mb-16"
          />
        </div>
        <div>
          <h3 className="text-center font-bold font-JosefinSans text-[42px] mb-14">
            Our Client Say!
          </h3>
          <div className="flex items-center justify-center w-full mb-7 r">
            <img
              src={client1}
              className={`w-[55px] h-[55px] duration-150 ease-in-out ${
                commentSlide === 0 && "-mt-5"
              }`}
              alt="Sam Bankman-Fried"
            />
            <img
              src={client2}
              className={`w-[55px] h-[55px] duration-150 ease-in-out mx-7 ${
                commentSlide === 1 && "-mt-5"
              }`}
              alt="Selina Gomez"
            />
            <img
              src={client3}
              className={`w-[55px] h-[55px] duration-150 ease-in-out ${
                commentSlide === 2 && "-mt-5"
              }`}
              alt="Guy Gershon"
            />
          </div>
          <Swiper
            modules={[Pagination]}
            initialSlide={commentSlide}
            slidesPerView={1}
            slidesPerGroup={1}
            onRealIndexChange={(element) =>
              setCommentSlide(element.activeIndex)
            }
            pagination={{ clickable: true }}
            className="mySwiper about-us"
          >
            {clientDetails.map((client) => (
              <SwiperSlide
                className="flex flex-col items-center text-center"
                key={client.name}
              >
                <h4 className="font-Lato text-2xl font-semibold text-black mb-1">
                  {client.name}
                </h4>
                <h5 className="text-[#8A8FB9] font-Lato text-[14px] mb-5">
                  {client.position}
                </h5>
                <p className="text-[#8A8FB9] font-base font-bold text-base font-Lato leading-6 w-7/12">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non
                  duis ultrices quam vel dui sollicitudin aliquet id arcu. Nam
                  vitae a enim nunc, sed sapien egestas ac nam. Tristique
                  ultrices dolor aliquam lacus volutpat praesent.
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
