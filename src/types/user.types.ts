import { ECartSituation } from "../enums/public.enum";
import { Product } from "./IProducts.interface";

export type TCart = {
  productID: string;
  quantity: number;
  color?: string;
};

export type TUserData = {
  wishlist: string[],
  cart: TCart[]
}

export interface ICartProps {
  cartProducts: Product[],
  cart: TCart[],
  totalCartPrice: string
}

export interface IUserSlice {
  userName: string | null,
  isLoggedIn: boolean,
  guest: boolean,
  uid: string,
  wishlist: string[],
  cart: TCart[],
  cartSituation: ECartSituation
}