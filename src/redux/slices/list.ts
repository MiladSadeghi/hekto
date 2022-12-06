import { createSlice } from "@reduxjs/toolkit"
import { ISliceInitialState, Product } from "../../types/IProducts.interface";

const initialState: ISliceInitialState = {
  loading: false,
  listedProduct: [],
  error: ""
}

const productRegularList = createSlice({
  name: "list",
  initialState,
  reducers: {
    lowest(state, action) {
      state.listedProduct = action.payload?.slice().sort((a: any, b: any) => a.price - b.price)
    },
    highest(state, action) {
      state.listedProduct = action.payload?.slice().sort((a: any, b: any) => b.price - a.price)
    },
    regular(state, { payload }) {
      console.log(payload.products)
      const filteredProducts = payload.products.filter((product: Product) => product.title.toLowerCase().includes(payload.search.toLowerCase()))
      console.log(filteredProducts)
      state.listedProduct = filteredProducts
    }
  },
})

export const { lowest, highest, regular } = productRegularList.actions;

export default productRegularList.reducer;