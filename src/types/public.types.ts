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

export type TComment = {
  user: string;
  rate: string;
  message: string;
}

export type TProductListSort = "regular" | "highest" | "lowest";