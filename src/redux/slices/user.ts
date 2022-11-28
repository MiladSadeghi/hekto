import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userName: null,
  isLoggedIn: false,
  guest: false,
  uid: null,
  wishlist: [],
  cart: []
}

const userSlice = createSlice({
  name: "auth",
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
    }
  }
})

export const { USER_LOGGED_IN, GUEST_LOGGED_IN } = userSlice.actions;

export default userSlice.reducer;