type ProductColors = {
  [key: string]: {
    name: string;
    color: string;
  }
}

type ProductImagesByColor = {
  [key: string]: string[]
}


export type Product = {
  category: string;
  colors?: any,
  id: string | number;
  imagesByColor? : any,
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