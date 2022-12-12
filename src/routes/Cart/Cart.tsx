import React, { FC, ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { Product } from "../../types/IProducts.interface";
import { Link } from "react-router-dom";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import {
  CHANGE_CART_SITUATION,
  CHANGE_QT,
  clearUserCart,
  removeCartItem,
} from "../../redux/slices/user";
import { RiCloseCircleFill } from "react-icons/ri";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { TCart, ICartProps } from "../../types/user.types";
import { ECartSituation } from "../../enums/public.enum";
import { motion } from "framer-motion";

const Cart: FC<ICartProps> = ({
  cartProducts,
  cart,
  totalCartPrice,
}): ReactElement => {
  const { uid, guest } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  document.title = "Hekto - Cart";

  const clearCart = async (e: any, uid: string) => {
    e.currentTarget.disabled = true;
    if (window.confirm("Are you sure?")) {
      dispatch(
        clearUserCart({
          successMessage: "Card clear successfully!",
          orderComplete: false,
        })
      );
    }
  };

  const productTotalPrice = (id: string, price: string): string => {
    const cartItem: any = cart.find((item: any) => item.productID === id);
    if (cartItem) {
      return String((cartItem.quantity * Number(price)).toFixed(2));
    } else return price;
  };

  return (
    <motion.div>
      <div className="bg-[#F6F5FF] py-16">
        <div className="container mx-auto flex">
          <h1 className="font-JosefinSans font-bold text-3xl text-[#101750]">
            Product Details
          </h1>
        </div>
      </div>
      <div className="container mx-auto my-24">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-9">
            <div className="overflow-x-auto">
              <table className="text-left">
                <thead className="mb-2">
                  <tr className="mb-2">
                    <th scope="col" className="cart-product-th">
                      Product
                    </th>
                    <th scope="col" className="cart-product-th">
                      Price
                    </th>
                    <th scope="col" className="cart-product-th">
                      Quantity
                    </th>
                    <th scope="col" className="cart-product-th">
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.map((product: Product) => (
                    <tr key={product.id} className="border-b border-gray-300">
                      <td className="py-4 px-6 font-medium text-gray-900 flex w-full">
                        <div className="relative w-[87px]">
                          <img
                            src={
                              product.imagesByColor
                                ? product.imagesByColor[
                                    product.colors!![0].name
                                  ][0]
                                : product.images[0]
                            }
                            alt={product.title}
                          />
                          <div
                            className="absolute -top-[7px] -right-[7px] cursor-pointer"
                            onClick={() =>
                              dispatch(
                                removeCartItem({ productID: product.id })
                              )
                            }
                          >
                            <RiCloseCircleFill size={16} />
                          </div>
                        </div>
                        <div className="flex flex-col my-auto ml-2">
                          <Link to={`/product-details/${product.id}`}>
                            <h2 className="font-JosefinSans text-sm font-semibold whitespace-nowrap">
                              {product.title}
                            </h2>
                          </Link>
                          {(() => {
                            const color = cart.find(
                              (item) => item.productID === product.id
                            )?.color;
                            if (color) {
                              return (
                                <p className="font-JosefinSans text-xs font-semibold mt-2 text-[#A1A8C1]">
                                  Color:{" "}
                                  <span className="text-sm">{color}</span>
                                </p>
                              );
                            }
                          })()}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {product.discount ? (
                          <h2 className="text-pink-cc font-JosefinSans">
                            ${product.discount}
                          </h2>
                        ) : (
                          <h2 className="text-navy-blue font-JosefinSans">
                            ${product.price}
                          </h2>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex">
                          <button
                            className="w-full bg-[#E7E7EF]"
                            onClick={() =>
                              dispatch(
                                CHANGE_QT({ id: product.id, amount: -1 })
                              )
                            }
                          >
                            <HiMinusSm className="m-auto" color="#BEBFC2" />
                          </button>
                          <input
                            type="text"
                            min={1}
                            className="outline-none w-10 text-center text-[#BEBFC2] bg-[#f5f5f6]"
                            value={(() => {
                              const value: TCart | undefined = cart.find(
                                (item: any) => item.productID === product.id
                              );
                              return value?.quantity;
                            })()}
                            readOnly
                          />
                          <button
                            className="w-full bg-[#E7E7EF]"
                            onClick={() =>
                              dispatch(CHANGE_QT({ id: product.id, amount: 1 }))
                            }
                          >
                            <HiPlusSm className="m-auto" color="#BEBFC2" />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <h2
                          className={`${
                            product.price ? "text-navy-blue" : "text-pink-cc"
                          } font-JosefinSans`}
                        >
                          $
                          {productTotalPrice(
                            product.id,
                            product.price ? product.price! : product.discount!
                          )}
                        </h2>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5">
              <button
                className="px-4 py-2 bg-pink-cc rounded-sm text-white font-JosefinSans"
                onClick={(e) => clearCart(e, uid)}
              >
                Clear Cart
              </button>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-3">
            <div className="w-full">
              <h5 className="py-3 px-6 font-JosefinSans text-xl text-navy-blue font-bold text-center mb-2">
                Cart Total
              </h5>
              <div className="py-10 px-5 bg-[#F4F4FC] w-full rounded-sm">
                <div className="flex items-center justify-between font-JosefinSans border-b border-gray-300 pb-2">
                  <p className="font-semibold text-lg font-Lato text-navy-blue">
                    Totals:
                  </p>
                  <p className="text-base font-Lato text-navy-blue">
                    ${totalCartPrice}
                  </p>
                </div>
                <p className="flex font-Lato text-xs text-[#8A91AB] items-center mt-4">
                  <IoIosCheckmarkCircle className="text-green-600 mr-2" />
                  Shipping & taxes calculated at checkout
                </p>
                <button
                  className="bg-green-500 text-white font-bold font-Lato text-sm mt-6 w-full rounded-sm py-3 disabled:opacity-75"
                  disabled={guest && true}
                  onClick={() =>
                    dispatch(CHANGE_CART_SITUATION(ECartSituation.Second))
                  }
                >
                  {guest ? "You should sign in first." : "Proceed To Checkout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
