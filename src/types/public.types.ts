import { Product } from "./IProducts.interface"

export type FCTypes = {
  data: Product
}

export type ShopOfferContent = {
  text: string,
  title: string,
  image: string
}

export type TShopOffer = {
  sectionTitle: React.ReactNode,
  classes: string
}

export type TProductListSort = "regular" | "highest" | "lowest";

export type TCart = {
  productID: string;
  quantity: number
};

export type TUserData = {
  wishlist: string[],
  cart: TCart[]
}