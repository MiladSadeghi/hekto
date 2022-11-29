import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { doc, getDoc } from "firebase/firestore";
import { fireStoreDB } from "../../helper/firebase.config";


export const getWishlist = createAsyncThunk("user/getWishlist", async (uid: string) => {
  const docRef = doc(fireStoreDB, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data()?.wishlist;
})

const initialState = {
  userName: null,
  isLoggedIn: false,
  guest: false,
  uid: null,
  wishlist: [],
  cart: [],
  wishlistLoading: true,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    USER_LOGGED_IN(state, { payload }) {
      state.userName = payload.userName;
      state.isLoggedIn = true;
      state.uid = payload.uid;
      state.guest = false;
      state.wishlist = payload.wishlist;
      state.cart = payload.cart;
    },
    GUEST_LOGGED_IN(state, { payload }) {
      state.guest = true;
      state.uid = payload.uid;
      state.isLoggedIn = true;
      state.userName = null;
      state.wishlist = payload.wishlist;
      state.cart = payload.cart;
    },
    ADD_TO_WISHLIST(state, { payload }) {
      const wishlist: any = [...state.wishlist, payload];
      state.wishlist = wishlist;
    },
    REMOVE_FROM_WISHLIST(state, { payload }) {
      state.wishlist = payload;
    },
    ADD_TO_CART(state, { payload }) {
      const cart: any = [...state.wishlist, payload];
      state.cart = cart;
    },
    ADD_QUANTITY(state, { payload }) {
      state.cart = payload;
    },
    SET_WISHLIST_CART(state, { payload }) {
      console.log(payload)
      state.cart = payload.cart;
      state.wishlist = payload.wishlist;
    }
  },
  extraReducers(builder) {
    builder.addCase(getWishlist.fulfilled, (state, action) => {
      console.log(action.payload);
      state.wishlist = action.payload;
      state.wishlistLoading = false;
    })
    builder.addCase(getWishlist.rejected, (state, action) => {
      state.wishlistLoading = false;
    })
  },
})

export const { USER_LOGGED_IN, GUEST_LOGGED_IN, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, ADD_TO_CART, SET_WISHLIST_CART } = userSlice.actions;

export default userSlice.reducer;