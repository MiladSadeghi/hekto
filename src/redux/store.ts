import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../redux/slices/products";
import productRegularList from "./slices/list";
import userSlice from "./slices/user";

export const store: any = configureStore({
  reducer: {
    product: productSlice,
    list: productRegularList,
    user: userSlice
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch