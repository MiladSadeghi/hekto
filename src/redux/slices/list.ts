import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ISliceInitialState, Product } from "../../types/IProducts.interface";

export const getRegularList = createAsyncThunk("product/regularList", async ({ products, search }: { products: any, search: any }) => {
  const filteredProducts = products.filter((product: Product) => product.title.toLowerCase().includes(search.toLowerCase()))
  return filteredProducts
})

const initialState: ISliceInitialState = {
  loading: true,
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
    regular(state, action) {
      state.listedProduct = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(getRegularList.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getRegularList.fulfilled, (state, action) => {
      state.listedProduct = action.payload;
      state.loading = false;
    })
    builder.addCase(getRegularList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  },
})

export const { lowest, highest, regular } = productRegularList.actions;

export default productRegularList.reducer;