export type ProductColors = {
  name: string;
  code: string;
}

type ProductImagesByColor = {
  [name: string]: string[]
}

export type Product = {
  category: string;
  colors?: ProductColors[],
  id: string;
  imagesByColor?: ProductImagesByColor,
  price: string;
  specifications: string[],
  title: string;
  images?: any;
  discount?: string;
  section?: string;
  comments?: [];
}

export interface ISliceInitialState {
  loading: false | true;
  products?: Product[],
  error: any,
  listedProduct?: Product[],
}

export type TProductDetailsStars = {
  star: number,
  count: number
}