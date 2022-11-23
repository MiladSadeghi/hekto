import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { child, get, ref } from "firebase/database";
import { database } from "../../helper/firebase.config";
import { ISliceInitialState } from "../../types/IProducts.interface"

export const getProducts = createAsyncThunk("product/getAll", async () => {
  const dbRef = ref(database);
  return get(child(dbRef, `product/`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      return "Nothing Found"
    }
  }).catch((error) => {
    return "Check Your Internet Connection."
  });
})


const initialState: ISliceInitialState = {
  loading: false,
  products: [],
  error: ""
}

const productSlice = createSlice({
  name: "products",
  initialState, 
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    })
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  },
})

export default productSlice.reducer;
