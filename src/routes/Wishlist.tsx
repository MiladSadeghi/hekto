import React, { useEffect, useState } from "react";
import Loader from "../helper/Loader";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import EmptyWishlist from "../images/wishlist.png";
import { Product } from "../types/IProducts.interface";
import {
  addToCart,
  getWishlist,
  removeFromWishlist,
} from "../helper/firebase.data";
import { TbShoppingCartPlus } from "react-icons/tb";
import { HiMinus } from "react-icons/hi";
import { Link } from "react-router-dom";

const Wishlist = () => {
  document.title = "Hekto - Wishlist";
  const { uid } = useAppSelector((state) => state.user);
  const { products } = useAppSelector((state) => state.product);
  const [wishlistProducts, setWishlistProducts] = useState<any>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uid && !!products.length) {
      getWishlist(uid).then(async (item: any) => {
        const list = await products.filter((item1: Product) => {
          return item.includes(item1.id);
        });
        setWishlistProducts(list);
      });
    }
  }, [products, uid]);

  const wishlistRemove = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productID: string | number
  ) => {
    e.currentTarget.disabled = true;
    await removeFromWishlist(uid, productID, dispatch);
    const list = await wishlistProducts.filter(
      (item: any) => item.id !== productID
    );
    setWishlistProducts(list);
    e.currentTarget.disabled = false;
  };

  if (wishlistProducts === undefined) return <Loader />;
  if (wishlistProducts.length === 0)
    return (
      <div className=" container mx-auto flex flex-col items-center justify-center py-20">
        <img
          className="md:w-1/3 sm:w-full"
          src={EmptyWishlist}
          alt="wishlist empty"
        />
        <h2 className="font-JosefinSans text-4xl mt-10 font-bold text-navy-blue">
          Your Wishlist Are Empty!
        </h2>
      </div>
    );
  return (
    <div>
      <div className="bg-[#F6F5FF] py-16">
        <div className="container mx-auto">
          <h1 className="font-JosefinSans font-bold text-3xl text-[#101750]">
            Wishlist
          </h1>
        </div>
      </div>
      <div className="container mx-auto my-24">
        <table className="w-full text-left">
          <thead className="border-b-2 border-gray-300 mb-2">
            <tr className="mb-2">
              <th scope="col" className="wishlist-product-th">
                Product
              </th>
              <th scope="col" className="wishlist-product-th">
                Name
              </th>
              <th scope="col" className="wishlist-product-th"></th>
              <th scope="col" className="wishlist-product-th"></th>
            </tr>
          </thead>
          <tbody>
            {wishlistProducts.map((product: Product) => (
              <tr key={product.id}>
                <td className="py-4 px-6">
                  <img
                    className="w-[150px]"
                    src={
                      product.imagesByColor
                        ? product.imagesByColor[product.colors!![0].name][0]
                        : product.images[0]
                    }
                    alt={product.title}
                  />
                </td>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link to={`/product-details/${product.id}`}>
                    <h2 className="font-JosefinSans text-lg font-semibold">
                      {product.title}
                    </h2>
                  </Link>
                </th>
                <td className="py-4 px-6">
                  <button
                    className="w-full h-7 flex items-center justify-center bg-green-600 rounded-sm"
                    onClick={() => addToCart(uid, product.id, dispatch)}
                  >
                    <TbShoppingCartPlus size={20} className="text-white" />
                  </button>
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={(e) => wishlistRemove(e, product.id)}
                    className="w-full h-7 flex items-center justify-center bg-red-600 rounded-sm disabled:opacity-75 ease-in-out duration-150"
                  >
                    <HiMinus className="text-white" size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
