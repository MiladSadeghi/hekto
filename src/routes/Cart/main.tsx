import React, { ReactElement, useEffect, useState } from "react";
import { getCart } from "../../helper/firebase.data";
import Loader from "../../helper/Loader";
import { useAppSelector } from "../../redux/hook";
import { Product } from "../../types/IProducts.interface";
import EmptyCart from "../../images/cart.jpg";
import Cart from "./Cart";
import Checkout from "./Checkout";
import OrderComplete from "./OrderComplete";
import { ECartSituation } from "../../enums/public.enum";

const CartMain = (): ReactElement => {
  const { uid, cart, cartSituation } = useAppSelector((state) => state.user);
  const { products } = useAppSelector((state) => state.product);
  const [cartProducts, setCartProducts] = useState<any>();

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
    <>
      {cartSituation === ECartSituation.First && (
        <Cart
          cart={cart}
          cartProducts={cartProducts}
          totalCartPrice={totalCartPrice()}
        />
      )}
      {cartSituation === ECartSituation.Second && <Checkout />}
      {cartSituation === ECartSituation.Third && <OrderComplete />}
    </>
  );
};

export default CartMain;
