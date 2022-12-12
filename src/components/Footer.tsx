import React, { FC, ReactElement } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { GrFacebookOption, GrTwitter } from "react-icons/gr";
import { Link } from "react-router-dom";

const Footer: FC = (): ReactElement => {
  return (
    <footer>
      <div className="bg-[#EEEFFB] py-20 flex items-center">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 text-center sm:text-start">
            <div className="w-full">
              <ul>
                <li className="mb-5 font-JosefinSans text-4xl text-black font-bold ">
                  Hekto
                </li>
                <li className="relative mb-5">
                  <input
                    type="email"
                    className="w-full focus-within:outline-none py-3 rounded-[3px] pl-6 pr-32"
                    placeholder="Enter Email Address"
                  />
                  <button className="absolute h-[85%] bg-pink-cc text-white px-9 top-1/2 -translate-y-1/2 right-0 rounded-[3px] mr-1 font-Lato">
                    Sign Up
                  </button>
                </li>
                <li>
                  <p className="font-Lato text-base text-[#8A8FB9] mb-3">
                    Contact Info
                  </p>
                  <a
                    href="mailto:MiladSadeghi2323@gmail.com"
                    className="text-[#8A8FB9] block mb-1"
                  >
                    MiladSadeghi2323@gmail.com
                  </a>
                  <a
                    href="https://t.me/wsxxsw"
                    rel="noreferrer"
                    target="_blank"
                    className="text-base text-[#8A8FB9]"
                  >
                    @wsxxsw
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <h5 className="font-JosefinSans text-[22px] font-semibold mb-6">
                  Customer Care
                </h5>
                <ul>
                  <li className="footer-li">
                    <Link to="/faq">Faq</Link>
                  </li>
                  <li className="footer-li">
                    <Link to="/contact-us">Contact Us</Link>
                  </li>
                  <li className="footer-li">
                    <Link to="/about-us">About Us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-start lg:items-center">
              <div>
                <h5 className="font-JosefinSans text-[22px] font-semibold mb-6">
                  Pages
                </h5>
                <ul>
                  <li className="footer-li">
                    <Link to="/products">Browse the shop</Link>
                  </li>
                  <li className="footer-li">
                    <Link to="/wishlist">Wishlist</Link>
                  </li>
                  <li className="footer-li">
                    <Link to="/cart">Cart</Link>
                  </li>
                  <li className="footer-li">
                    <Link to="/signin">Sign In</Link>
                  </li>
                  <li className="footer-li">
                    <Link to="/signup">Sign Up</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#E7E4F8] py-2">
        <div className="container mx-auto flex justify-between flex-wrap">
          <p className="font-bold font-Lato text-[#9DA0AE]">
            ©MiladSadeghi - All Rights Reserved
          </p>
          <div className="flex items-center">
            <AiFillInstagram className="bg-navy-blue p-1 text-white text-2xl rounded-full mr-4" />
            <GrFacebookOption className="bg-navy-blue p-1 text-white text-2xl rounded-full mr-4" />
            <GrTwitter className="bg-navy-blue p-1 text-white text-2xl rounded-full mr-4" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
