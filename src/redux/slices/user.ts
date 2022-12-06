import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { ECartSituation } from "../../enums/public.enum";
import { fireStoreDB } from "../../helper/firebase.config";
import { getCart } from "../../helper/firebase.data";
import { IUserSlice } from "../../types/user.types";


export const getWishlist = createAsyncThunk("user/getWishlist", async (uid: string) => {
  const docRef = doc(fireStoreDB, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data()?.wishlist;
})

export const clearUserCart = createAsyncThunk("user/clearCart", async ({ uid, successMessage, orderComplete }: { uid: string, successMessage: string, orderComplete: boolean }) => {
  const id = toast.loading("Please wait...");
  try {
    const userRef = doc(fireStoreDB, `users/${uid}`);
    await updateDoc(userRef, {
      cart: [],
    });
    toast.update(id, { render: successMessage, type: "success", isLoading: false, autoClose: 3000, closeOnClick: true, pauseOnHover: true, });
    if (orderComplete) {
      return ECartSituation.Third
    }
  } catch (error) {
    toast.update(id, { render: "Sorry! Try again later...", type: "error", isLoading: false, closeOnClick: true, pauseOnHover: true, });
  }
})

export const removeCartItem = createAsyncThunk("user/removeCartItem", async ({ uid, productID }: { uid: string, productID: string }, { getState }) => {
  const id = toast.loading("Please wait...");
  try {
    const cartItems = await getCart(uid);
    const newCartItems = await cartItems.filter((item: any) => item.productID !== productID);
    const userRef = doc(fireStoreDB, `users/${uid}`);
    await updateDoc(userRef, {
      cart: newCartItems,
    });
    toast.update(id, { render: "Card items removed!", type: "success", isLoading: false, autoClose: 3000, closeOnClick: true, pauseOnHover: true, });
    return newCartItems
  } catch (error) {
    toast.update(id, { render: "Sorry! Try again later...", type: "error", isLoading: false, closeOnClick: true, pauseOnHover: true, });
  }
})

const initialState: IUserSlice = {
  userName: null,
  isLoggedIn: false,
  guest: false,
  uid: "",
  wishlist: [],
  cart: [],
  cartSituation: ECartSituation.First
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
    SET_WISHLIST_CART(state, { payload }) {
      state.cart = payload.cart;
      state.wishlist = payload.wishlist;
    },
    REMOVE_FROM_CART(state, { payload }) {
      state.cart = payload;
    },
    CHANGE_QT(state, { payload }) {
      if (state.cart.some((item: any) => (item.productID === payload.id) && ((item.quantity + payload.amount) >= 1))) {
        const cart: any = state.cart.map((cartItem: any) => {
          if (cartItem.productID === payload.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + payload.amount
            }
          } else {
            return cartItem
          }
        })
        state.cart = cart;
      }
    },
    CHANGE_CART_SITUATION(state, { payload }) {
      state.cartSituation = payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(getWishlist.pending, (state) => {
    })
    builder.addCase(getWishlist.fulfilled, (state, action) => {
      state.wishlist = action.payload;
    })
    builder.addCase(getWishlist.rejected, (state, action) => {
      toast.error("Please refresh the page")
    })
    builder.addCase(clearUserCart.fulfilled, (state, action: any) => {
      state.cart = [];
      state.cartSituation = action.payload;
    })
    builder.addCase(clearUserCart.rejected, (state, action) => {
      toast.error("Please refresh the page")
    })
    builder.addCase(removeCartItem.fulfilled, (state, action) => {
      state.cart = action.payload;
    })
    builder.addCase(removeCartItem.rejected, (state, action) => {
      toast.error("Please refresh the page")
    })
  },
})

export const { USER_LOGGED_IN, GUEST_LOGGED_IN, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, ADD_TO_CART, SET_WISHLIST_CART, REMOVE_FROM_CART, CHANGE_QT, CHANGE_CART_SITUATION } = userSlice.actions;

export default userSlice.reducer;