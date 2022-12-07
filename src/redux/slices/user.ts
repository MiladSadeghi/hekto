import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { ECartSituation } from "../../enums/public.enum";
import { auth, fireStoreDB } from "../../helper/firebase.config";
import { createUserData } from "../../helper/firebase.data";
import { IUserSlice } from "../../types/user.types";
import { AccountErrors } from "../../Validation/account";


export const getUserData = async (uid: string): Promise<IUserSlice> => {
  const docRef = doc(fireStoreDB, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as IUserSlice;
}

export const clearUserCart = createAsyncThunk("user/clearCart", async ({ successMessage, orderComplete }: { successMessage: string, orderComplete: boolean }, { getState }) => {
  const id = toast.loading("Please wait...");
  const { user }: any = getState();
  try {
    const userRef = doc(fireStoreDB, `users/${user.uid}`);
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

export const removeCartItem = createAsyncThunk("user/removeCartItem", async ({ productID }: { productID: string }, { getState }) => {
  const id = toast.loading("Please wait...");
  const { user }: any = getState();
  try {
    const cartItems = (await getUserData(user.uid)).cart;
    const newCartItems = cartItems.filter((item: any) => item.productID !== productID);
    const userRef = doc(fireStoreDB, `users/${user.uid}`);
    await updateDoc(userRef, {
      cart: newCartItems,
    });
    toast.update(id, { render: "Card items removed!", type: "success", isLoading: false, autoClose: 3000, closeOnClick: true, pauseOnHover: true, });
    return newCartItems
  } catch (error) {
    toast.update(id, { render: "Sorry! Try again later...", type: "error", isLoading: false, closeOnClick: true, pauseOnHover: true, });
  }
})

export const signIn = createAsyncThunk("user/guestToUser", async ({ email, password }: { email: string, password: string }, { getState }) => {
  const wait = toast.loading("Please wait...");
  const { user: User }: any = getState();
  try {
    const guestData = await getUserData(User.uid);
    const user = await signInWithEmailAndPassword(auth, email, password);
    const { wishlist: guestWishlist, cart: guestCart } = guestData;
    const { wishlist: userWishlist, cart: userCart } = await getUserData(user.user.uid);

    const compareCarts = [...userCart, ...guestCart];
    const newCart = await compareCarts.reduce((acc: any, current: any) => {
      const x = acc.find((item: any) => item.productID === current.productID);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    const arr = userWishlist.concat(guestWishlist);
    const newWishlist = [...new Set(arr)];
    if (newWishlist || newCart) {
      const userRef = doc(fireStoreDB, `users/${user.user.uid}`);
      await updateDoc(userRef, {
        ...(newCart && { cart: newCart }),
        ...(newWishlist && { wishlist: newWishlist }),
      });
    }
    const userData = await getUserData(user.user.uid);
    toast.update(wait, {
      render: `Welcome back ${userData!.userName}`,
      type: "success",
      isLoading: false,
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
    });
  } catch (error: any) {
    toast.update(wait, {
      render: AccountErrors(error.code),
      type: "error",
      isLoading: false,
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }
})

export const signUp = createAsyncThunk("user/signUp", async ({ email, password, userName }: { email: string, password: string, userName: string }, { getState }) => {
  const wait = toast.loading("Please wait...");
  const { user }: any = getState();
  try {
    const guestData = await getUserData(user.uid);
    const registeredUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await createUserData(
      registeredUser.user.uid,
      "user",
      guestData.wishlist,
      guestData.cart,
      userName
    );
    toast.update(wait, {
      render: `Welcome ${userName}`,
      type: "success",
      isLoading: false,
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
    });
  } catch (error: any) {
    toast.update(wait, {
      render: AccountErrors(error.code),
      type: "error",
      isLoading: false,
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }
})

export const addToWishlist = createAsyncThunk("user/addToWishlist", async ({ productID }: { productID: string }, { getState }) => {
  const wait = toast.loading("Please wait...");
  const { user }: any = getState();
  try {
    const userWishlist: any = (await getUserData(user.uid)).cart;
    const newWishlist: string[] = [...userWishlist, productID];
    const userRef = doc(fireStoreDB, `users/${user.uid}`);
    await updateDoc(userRef, {
      wishlist: newWishlist
    });
    toast.update(wait, { render: "Added to wishlist!.", type: "success", isLoading: false, autoClose: 3000, closeOnClick: true, pauseOnHover: true, });
    return newWishlist
  } catch (error) {
    toast.update(wait, { render: "Sorry! Try again later...", type: "error", isLoading: false, closeOnClick: true, pauseOnHover: true, });
  }
})

export const addToCart = createAsyncThunk("user/addToCart", async ({ productID, colorName }: { productID: string, colorName?: string }, { getState }) => {
  const wait = toast.loading("Please wait...");
  const { user }: any = getState();
  try {
    const userRef = doc(fireStoreDB, `users/${user.uid}`);
    const userCart = (await getUserData(user.uid)).cart;
    const isAvailable = userCart.some((item: any) => item.productID === productID);
    if (!isAvailable) {
      const cartItem = {
        productID,
        quantity: 1,
        ...(colorName && { color: colorName })
      };
      const newCart = [...userCart, cartItem];
      await updateDoc(userRef, {
        cart: newCart
      });
      toast.update(wait, { render: "Added to cart!.", type: "success", isLoading: false, autoClose: 3000, closeOnClick: true, pauseOnHover: true, });
      return newCart
    } else {
      toast.update(wait, { render: "Already in!", type: "warning", isLoading: false, autoClose: 3000, closeOnClick: true, pauseOnHover: true, });
    }
  } catch (error) {
    toast.update(wait, { render: "Sorry! Try again later...", type: "error", isLoading: false, closeOnClick: true, pauseOnHover: true, });
  }
})

export const removeFromWishlist = createAsyncThunk("user/removeFromWishlist", async ({ productID }: { productID: string }, { getState }) => {
  const wait = toast.loading("Please wait...");
  const { user }: any = getState();
  try {
    const userRef = doc(fireStoreDB, `users/${user.uid}`);
    const userWishlist = (await getUserData(user.uid)).wishlist;
    const newWishlist = userWishlist.filter((item: string) => item !== productID) || [];
    await updateDoc(userRef, {
      wishlist: newWishlist
    });
    toast.update(wait, { render: "Removed from wishlist!.", type: "success", isLoading: false, autoClose: 3000, closeOnClick: true, pauseOnHover: true, });
    return newWishlist
  } catch (error: any) {
    toast.update(wait, { render: "Sorry! Try again later...", type: "error", isLoading: false, closeOnClick: true, pauseOnHover: true, autoClose: 3000 });
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
    builder.addCase(clearUserCart.fulfilled, (state, action: any) => {
      state.cart = [];
      state.cartSituation = action.payload;
    })
    builder.addCase(clearUserCart.rejected, (state, action) => {
      toast.error("Please refresh the page")
    })
    builder.addCase(removeCartItem.fulfilled, (state, { payload }) => {
      state.cart = payload!;
    })
    builder.addCase(addToWishlist.fulfilled, (state, { payload }) => {
      state.wishlist = payload!;
    })
    builder.addCase(addToCart.fulfilled, (state, { payload }) => {
      state.cart = payload!;
    })
    builder.addCase(removeFromWishlist.fulfilled, (state, { payload }) => {
      state.wishlist = payload!;
    })
    builder.addCase(removeCartItem.rejected, (state, action) => {
      toast.error("Please refresh the page")
    })
  },
})

export const { USER_LOGGED_IN, GUEST_LOGGED_IN, CHANGE_QT, CHANGE_CART_SITUATION } = userSlice.actions;

export default userSlice.reducer;