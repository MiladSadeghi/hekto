import React, { FC, ReactElement, useEffect, useState } from "react";
import {
  AiFillHeart,
  AiFillInstagram,
  AiFillStar,
  AiOutlineArrowRight,
  AiOutlineHeart,
  AiOutlineStar,
} from "react-icons/ai";
import { GrFacebookOption, GrTwitter } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../helper/Loader";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slices/user";
import { Product, TProductDetailsStars } from "../../types/IProducts.interface";
import { ProductColors } from "../../types/IProducts.interface";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { ref, set, update } from "firebase/database";
import { realTimeDB } from "../../helper/firebase.config";

const ProductDetails: FC = (): ReactElement | null => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { wishlist, guest, userName } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { products: Products } = useAppSelector((state) => state.product);
  const [productDetails, setProductDetails] = useState<Product>();
  const [stars, setStars] = useState<TProductDetailsStars>({
    star: 0,
    count: 0,
  });
  const [toggleState, setToggleState] = useState<number>(1);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  const [color, setColor] = useState<ProductColors>();
  const [index, setIndex] = useState<number>();
  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  const votes = (obj: any) => {
    const votes = obj.map((item: any) => item.vote);
    const arrAvg = votes.reduce((a: any, b: any) => a + b, 0) / votes.length;
    return {
      star: Math.floor(arrAvg),
      count: votes.length,
    };
  };

  const Stars: FC<any> = ({ numb }: { numb: number }): any => {
    let star = [];
    for (let i = 1; i >= 5; i++) {
      if (i <= numb) {
        star.push(<AiOutlineStar />);
      } else {
        star.push(<AiFillStar />);
      }
    }
    return star;
  };

  useEffect(() => {
    const product: Product = Products.find(
      (product: Product, index: number) => {
        if (product.id === id) {
          setIndex(index);
          return product;
        } else return undefined;
      }
    );
    if (product !== undefined && Products.length !== 0) {
      document.title = `Hekto - ${product?.title}`;
      setProductDetails(product);
      if (product.colors) {
        setColor({
          code: product.colors[0].code,
          name: product.colors[0].name,
        });
      }
      // if (product.comments) setStars(votes(product.comments));
    } else if (product === undefined && Products.length !== 0) {
      navigate("/404");
    }
  }, [Products]);

  const submitComment = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const wait = toast.loading("Please wait...");
    const target = e.target as typeof e.target & {
      "rate-selector": { value: number };
      message: { value: string };
    };
    const rate = target["rate-selector"].value;
    const message = target["message"].value;
    try {
      if (message.length <= 10) {
        toast.update(wait, {
          render: "Short message!",
          type: "error",
          isLoading: false,
          closeOnClick: true,
          pauseOnHover: true,
          autoClose: 3000,
        });
      } else {
        const comments: any = [
          ...(Products[index!].comments || []),
          { user: userName, message, rate },
        ];
        await set(ref(realTimeDB, `product/${index}/comments`), comments);
        toast.update(wait, {
          render: "your comment submitted",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
        });
        window.location.reload();
      }
    } catch (error: any) {
      toast.update(wait, {
        render: "Sorry! Try again later...",
        type: "error",
        isLoading: false,
        closeOnClick: true,
        pauseOnHover: true,
        autoClose: 3000,
      });
    }
  };

  if (!productDetails) return <Loader />;
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
            Product Details
          </h1>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="mt-24 mb-28">
          <div className="w-full shadow-[0_0_25px_10px_#f6f4fd] flex px-3 py-3 rounded-sm">
            <div className="w-full flex items-center gap-4">
              <div className="w-1/4 grid grid-cols-1 gap-2 h-full content-between">
                {productDetails.imagesByColor
                  ? productDetails.imagesByColor[color!.name].map(
                      (image: string, index: number) => (
                        <img
                          className={`rounded-[4px] duration-100 border-2 border-transparent opacity-70 ease-in-out ${
                            mainImageIndex === index
                              ? "selected-main-image"
                              : ""
                          }`}
                          key={image}
                          src={image}
                          alt={productDetails.title}
                          onClick={() => setMainImageIndex(index)}
                          style={{ borderColor: `${color!.code}` }}
                        />
                      )
                    )
                  : productDetails.images.map(
                      (image: string, index: number) => (
                        <img
                          className={`rounded-[4px] duration-100 border-2 border-transparent opacity-70 ease-in-out ${
                            mainImageIndex === index
                              ? "selected-main-image"
                              : ""
                          }`}
                          key={image}
                          src={image}
                          alt={productDetails.title}
                          onClick={() => setMainImageIndex(index)}
                        />
                      )
                    )}
              </div>
              <div className="w-full">
                {productDetails.imagesByColor ? (
                  <img
                    className="rounded-sm"
                    key={productDetails.imagesByColor[color!.name][0]}
                    src={
                      productDetails.imagesByColor[color!.name][mainImageIndex]
                    }
                    alt={productDetails.title}
                  />
                ) : (
                  <img
                    className="rounded-sm"
                    key={productDetails.images[0]}
                    src={productDetails.images[mainImageIndex]}
                    alt={productDetails.title}
                  />
                )}
              </div>
            </div>
            <div className="w-full py-16 px-4">
              <h2 className="text-3xl font-JosefinSans text-[#0D134E] font-bold mb-5">
                {productDetails.title}
              </h2>
              {/* <div>
                {productDetails.comments && (
                  <div className="flex">
                    <div>
                      <Stars numb={stars.star} />
                    </div>
                    <p>{stars.count}</p>
                  </div>
                )}
              </div> */}
              <div className="flex mt-10">
                <p
                  className={`${
                    !productDetails.discount && "hidden"
                  } font-JosefinSans text-lg text-navy-blue font-semibold`}
                >
                  ${productDetails.discount}
                </p>
                <p
                  className={`${
                    productDetails.discount && "line-through text-pink-cc ml-3"
                  } font-JosefinSans text-lg text-navy-blue font-semibold `}
                >
                  ${productDetails.price}
                </p>
              </div>
              {productDetails.colors && (
                <div className="flex items-center mt-10">
                  <p className="font-JosefinSans text-navy-blue text-lg font-bold mr-7">
                    Colors
                  </p>
                  {productDetails.colors.map((item: any) => (
                    <div className="relative mr-2" key={item.code}>
                      <div
                        className={`w-6 h-2 rounded-2xl group cursor-pointer relative ${
                          color!.name === item.name
                            ? "outline-2 outline outline-slate-400"
                            : ""
                        }`}
                        style={{ background: item.code }}
                        onClick={() =>
                          setColor({ name: item.name, code: item.code })
                        }
                      >
                        <div
                          className="opacity-0 w-max rounded-lg py-2 absolute z-10 group-hover:opacity-100 -top-10 left-1/2 -translate-x-1/2 px-3 pointer-events-none"
                          style={{ background: item.code }}
                        >
                          <p className="mix-blend-difference text-white text-center text-sm font-JosefinSans">
                            {item.name}
                          </p>
                          <svg
                            className="absolute h-2 w-full left-1/2 -translate-x-1/2 top-[2.2rem]"
                            x="0px"
                            y="0px"
                            viewBox="0 0 255 255"
                            style={{ color: item.code }}
                          >
                            <polygon
                              className="fill-current"
                              points="0,0 127.5,127.5 255,0"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center mt-10">
                <h5
                  onClick={() =>
                    dispatch(addToCart({ productID: productDetails.id }))
                  }
                  className="font-JosefinSans text-lg font-bold text-navy-blue py-1 px-4 cursor-pointer"
                >
                  Add To Cart
                </h5>
                {wishlist.includes(productDetails.id) ? (
                  <AiFillHeart
                    onClick={() =>
                      dispatch(
                        removeFromWishlist({ productID: productDetails.id })
                      )
                    }
                    className="ml-4 font-bold text-red-600 cursor-pointer"
                    size={30}
                  />
                ) : (
                  <AiOutlineHeart
                    onClick={() =>
                      dispatch(addToWishlist({ productID: productDetails.id }))
                    }
                    className="ml-4 font-bold text-red-600 cursor-pointer"
                    size={30}
                  />
                )}
              </div>
              <div className="flex mt-10">
                <p className="mr-7 font-JosefinSans text-lg font-bold text-navy-blue">
                  Share
                </p>
                <AiFillInstagram className="bg-navy-blue p-1 text-white text-2xl rounded-full mr-4" />
                <GrFacebookOption className="bg-pink-cc p-1 text-white text-2xl rounded-full mr-4" />
                <GrTwitter className="bg-navy-blue p-1 text-white text-2xl rounded-full mr-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F9F8FE]">
        <div className="container mx-auto py-24">
          <div className="flex">
            <h6
              className={`cursor-pointer font-JosefinSans text-2xl font-semibold text-navy-blue ${
                toggleState === 1 ? "underline" : ""
              } mr-5`}
              onClick={(e) => toggleTab(1)}
            >
              Specification
            </h6>
            <h6
              className={`cursor-pointer font-JosefinSans text-2xl font-semibold text-navy-blue ${
                toggleState === 2 ? "underline" : ""
              } mr-5`}
              onClick={(e) => toggleTab(2)}
            >
              Comments
            </h6>
          </div>
          <div className="mt-10">
            <div className={`${toggleState === 1 ? "block" : "hidden"}`}>
              {productDetails.specifications.map((specification) => (
                <p
                  key={specification}
                  className="font-JosefinSans text-base font-semibold text-[#A9ACC6] mb-2 last:mb-0 flex items-center group"
                >
                  <AiOutlineArrowRight className="mr-3 text-black group-hover:text-[#2F1AC4]" />
                  {specification}
                </p>
              ))}
            </div>
            <div
              className={`${toggleState === 2 ? "flex columns-2" : "hidden"}`}
            >
              <div className="w-full">
                {guest ? (
                  <div className="h-[300px] w-full flex items-center justify-center">
                    <p className="font-bold text-navy-blue text-xl">
                      You should sign in first!.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => submitComment(e)}
                    className="flex flex-col pr-2"
                  >
                    <label
                      htmlFor="rate-selector"
                      className="mb-2 font-Lato text-navy-blue"
                    >
                      Rate
                    </label>
                    <select
                      id="rate-selector"
                      className="focus-within:outline-none w-full mb-5 border-[#C2C5E1] border-[1px] px-4 py-3 bg-white"
                      defaultValue={5}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                    <label
                      htmlFor="message"
                      className="mb-2 font-Lato text-navy-blue"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      minLength={10}
                      cols={30}
                      rows={10}
                      className="focus-within:outline-none w-full mb-5 border-[#C2C5E1] border-[1px] px-4 py-3 bg-white resize-none"
                    />
                    <button
                      type="submit"
                      className="py-2 text-white bg-pink-cc rounded-sm"
                    >
                      Submit Comment
                    </button>
                  </form>
                )}
              </div>
              <div className="w-full">
                {productDetails.comments ? (
                  <p>test</p>
                ) : (
                  <div
                    className={`${
                      guest ? "h-[300px]" : "h-full"
                    } flex items-center justify-center`}
                  >
                    <p className="font-bold text-navy-blue text-xl ">
                      No comments yet, You want to be first?
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
