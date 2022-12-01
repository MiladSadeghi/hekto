import React, { FC, ReactElement, useEffect, useState } from "react";
import { getCart, removeFromWishlist } from "../helper/firebase.data";
import Loader from "../helper/Loader";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { Product } from "../types/IProducts.interface";
import EmptyCart from "../images/cart.jpg";
import { Link } from "react-router-dom";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { CHANGE_QT, clearUserCart, removeCartItem } from "../redux/slices/user";
import { RiCloseCircleFill } from "react-icons/ri";
import { IoIosCheckmarkCircle } from "react-icons/io";

const Cart: FC = (): ReactElement => {
  const { uid, cart } = useAppSelector((state) => state.user);
  const { products } = useAppSelector((state) => state.product);
  const [cartProducts, setCartProducts] = useState<any>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uid && !!products.length) {
      getCart(uid).then(async (item: any) => {
        const cartProductsID = item.map((item1: any) => item1.productID);
        const list = await products.filter((item2: Product) => {
          return cartProductsID.includes(item2.id);
        });
        setCartProducts(list);
      });
    }
  }, [products, uid]);

  const cartRemove = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productID: string | number
  ) => {
    e.currentTarget.disabled = true;
    await removeFromWishlist(uid, productID, dispatch);
    const list = await cartProducts.filter(
      (item: any) => item.id !== productID
    );
    setCartProducts(list);
    e.currentTarget.disabled = false;
  };

  const productTotalPrice = (id: string, price: string | undefined): string => {
    const cartItem = cart.find((item: any) => item.productID === id);
    return String(cartItem.quantity * Number(price));
  };

  const totalCartPrice = (): string => {
    const pricesArray: any = [];
    cartProducts.forEach((item1: any) =>
      cart.forEach((item2: any) => {
        if (item1.id === item2.productID) {
          pricesArray.push((item1.price || item1.discount) * item2.quantity);
        }
      })
    );
    const totalPrice = pricesArray.reduce(
      (x: number, y: number) => Number(x) + Number(y),
      0
    );
    return totalPrice;
  };

  const clearCart = async (e: any, uid: string) => {
    e.currentTarget.disabled = true;
    if (window.confirm("Are you sure?")) {
      dispatch(clearUserCart(uid));
    }
  };

  if (cartProducts === undefined) return <Loader />;
  if (cartProducts.length === 0 || cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center relative">
        <img className="object-cover" src={EmptyCart} alt="wishlist empty" />
        <h2 className="font-JosefinSans text-4xl mt-10 font-bold text-pink-cc absolute bottom-10">
          Your Cart Are Empty!
        </h2>
      </div>
    );
  }
  return (
    <div>
      <div className="bg-[#F6F5FF] py-16">
        <div className="container mx-auto flex">
          <h1 className="font-JosefinSans font-bold text-3xl text-[#101750]">
            Product Details
          </h1>
        </div>
      </div>
      <div className="container mx-auto my-24">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-9">
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
                    <td className="py-4 px-6 font-medium text-gray-900 dark:text-white flex w-full">
                      <div className="relative">
                        <img
                          className="w-[87px]"
                          src={
                            product.imagesByColor
                              ? product.imagesByColor[product.colors[0].name][0]
                              : product.images[0]
                          }
                          alt={product.title}
                        />
                        <div
                          className="absolute -top-[7px] -right-[7px]"
                          onClick={() =>
                            dispatch(
                              removeCartItem({ uid, productID: product.id })
                            )
                          }
                        >
                          <RiCloseCircleFill size={16} />
                        </div>
                      </div>
                      <Link
                        className="my-auto ml-2"
                        to={`/product-details/${product.id}`}
                      >
                        <h2 className="font-JosefinSans text-sm font-semibold">
                          {product.title}
                        </h2>
                      </Link>
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
                            dispatch(CHANGE_QT({ id: product.id, amount: -1 }))
                          }
                        >
                          <HiMinusSm className="m-auto" color="#BEBFC2" />
                        </button>
                        <input
                          type="text"
                          min={1}
                          className="outline-none w-10 text-center text-[#BEBFC2] bg-[#f5f5f6]"
                          value={(() => {
                            const value = cart.find(
                              (item: any) => item.productID === product.id
                            );
                            return value.quantity;
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
                          product.price ? product.price : product.discount
                        )}
                      </h2>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-5">
              <button
                className="px-4 py-2 bg-pink-cc rounded-sm text-white font-JosefinSans"
                onClick={(e) => clearCart(e, uid)}
              >
                Clear Cart
              </button>
            </div>
          </div>
          <div className="col-span-3">
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
                    ${totalCartPrice()}
                  </p>
                </div>
                <p className="flex font-Lato text-xs text-[#8A91AB] items-center mt-4">
                  <IoIosCheckmarkCircle className="text-green-600 mr-2" />
                  Shipping & taxes calculated at checkout
                </p>
                <button className="bg-green-500 text-white font-bold font-Lato text-sm mt-6 w-full rounded-sm py-3">
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
