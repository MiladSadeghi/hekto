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