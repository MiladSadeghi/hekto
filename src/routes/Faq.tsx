import React, { FC, ReactElement } from "react";
import Logos from "./Home/Logos";
import { motion } from "framer-motion";

const Faq: FC = (): ReactElement => {
  document.title = "Hekto - FAQ";
  const informations = [
    {
      title: "How can I track my order?",
      body: "Click on the My Orders option. In this section, you can see your order by clicking on the details. In this section, you can follow the process of preparing and sending your order.",
    },
    {
      title: "How can I cancel my order?",
      body: "You can cancel an order or a shipment that you refused to send by referring to your profile. You can refer to the additional information to view the order cancellation process.",
    },
    {
      title: "How can I notify you of my request to return the goods?",
      body: "You can register your request through the return request form in the user account, contact us page and phone number.",
    },
    {
      title: "How is the shipping cost calculated?",
      body: "The shipping cost varies based on the shipping method and is displayed at the time of placing the order.",
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
            FAQ
          </h1>
        </div>
      </div>
      <div className="container mx-auto mt-24 mb-20">
        <div className="flex gap-8 mb-20">
          <div className="w-full">
            <h5 className="text-[#1D3178] font-bold text-4xl font-JosefinSans mb-16">
              General Information
            </h5>
            <div className="flex flex-col">
              {informations.map((item) => (
                <div className="mb-14" key={item.title}>
                  <h6 className="font-JosefinSans font-bold text-lg text-[#1D3178] mb-5">
                    {item.title}
                  </h6>
                  <p className="font-JosefinSans text-base text-[#A1ABCC]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full px-9 py-16 bg-[#F8F8FD]">
            <h5 className="text-2xl font-bold font-JosefinSans text-[#1D3178]">
              Ask a Question
            </h5>
            <div className="mt-24">
              <input
                type="text"
                className="form-input py-2 mb-10"
                placeholder="Your Name*"
              />
              <input
                type="text"
                className="form-input py-2 mb-10"
                placeholder="Subject*"
              />
              <textarea
                className="form-input resize-none"
                rows={8}
                placeholder="Type Your Message*"
              />
              <button className="font-JosefinSans text-base font-semibold bg-pink-cc py-3 px-10 text-white rounded-[3px] mt-5">
                Send Mail
              </button>
            </div>
          </div>
        </div>
        <Logos />
      </div>
    </motion.div>
  );
};

export default Faq;
