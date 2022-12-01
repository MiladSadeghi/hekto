import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { ADD_TO_CART, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, SET_WISHLIST_CART } from "../redux/slices/user";
import { TCart, TUserData } from "../types/public.types";
import { fireStoreDB } from "./firebase.config";

export const getUserData = async (uid: string) => {
  const docRef = doc(fireStoreDB, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export const createUserData = async (uid: string, userType: string, wishlist: string[], cart: TCart[], userName?: string) => {
  await setDoc(doc(fireStoreDB, "users", uid), {
    userName: userName ? userName : null,
    uid: uid,
    type: userType,
    wishlist,
    cart
  });
}

export const getWishlist = async (uid: string) => {
  const docRef = doc(fireStoreDB, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data()?.wishlist;
}

export const getCart = async (uid: string) => {
  const docRef = doc(fireStoreDB, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data()?.cart;
}

export const addToWishlist = async (uid: string, productID: string | number, dispatch: Function) => {
  const id = toast.loading("Please wait...");
  try {
    const userRef = doc(fireStoreDB, `users/${uid}`);
    const userWishlist: any = await getWishlist(uid);
    await updateDoc(userRef, {
      wishlist: [...userWishlist, productID]
    });
    dispatch(ADD_TO_WISHLIST(productID))
    toast.update(id, { render: "Added to wishlist!.", type: "success", isLoading: false, autoClose: 3000, closeOnClick: true, pauseOnHover: true, });
  } catch (error) {
    toast.update(id, { render: "Sorry! Try again later...", type: "error", isLoading: false, closeOnClick: true, pauseOnHover: true, });
  }
}

export const removeFromWishlist = async (uid: string, productID: string | number, dispatch: Function) => {
  const id = toast.loading("Please wait...");
  try {
    const userRef = doc(fireStoreDB, `users/${uid}`);
    const userWishlist = await getWishlist(uid);
    const newWishlist = userWishlist.filter((item: string) => item !== productID) || []
    await updateDoc(userRef, {
      wishlist: newWishlist
    });
    dispatch(REMOVE_FROM_WISHLIST(newWishlist))
    toast.update(id, { render: "Removed from wishlist!.", type: "success", isLoading: false, autoClose: 3000, closeOnClick: true, pauseOnHover: true, });
  } catch (error) {
    toast.update(id, { render: "Sorry! Try again later...", type: "error", isLoading: false, closeOnClick: true, pauseOnHover: true, });
  }
}

export const addToCart = async (uid: string, productID: string | number, dispatch: Function) => {
  const id = toast.loading("Please wait...");
  try {
    const userRef = doc(fireStoreDB, `users/${uid}`);
    const userCart = await getCart(uid);
    const isAvailable = userCart.some((item: any) => item.productID === productID);
    if (!isAvailable) {
      const cartItem = {
        productID,
        quantity: 1
      };
      await updateDoc(userRef, {
        cart: [...userCart, cartItem]
      });
      dispatch(ADD_TO_CART(cartItem))
      toast.update(id, { render: "Added to cart!.", type: "success", isLoading: false, autoClose: 3000, closeOnClick: true, pauseOnHover: true, });
    } else {
      toast.update(id, { render: "Already in!", type: "warning", isLoading: false, autoClose: 3000, closeOnClick: true, pauseOnHover: true, });
    }
  } catch (error) {
    toast.update(id, { render: "Sorry! Try again later...", type: "error", isLoading: false, closeOnClick: true, pauseOnHover: true, });
  }
}

export const getWishlistAndCart = async (uid: string): Promise<TUserData> => {
  const docRef = doc(fireStoreDB, "users", uid);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const wishlist: string[] = data?.wishlist
  const cart: TCart[] = data?.cart
  return {
    wishlist,
    cart
  }
}

export const guestToUser = async (userUid: string, guestData: TUserData) => {
  const { wishlist: guestWishlist, cart: guestCart } = guestData;
  const { wishlist: userWishlist, cart: userCart } = await getWishlistAndCart(userUid);

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

  SET_WISHLIST_CART({ newCart, newWishlist });
  const userRef = doc(fireStoreDB, `users/${userUid}`);

  if (newWishlist.length !== 0 && newCart.length !== 0) {
    await updateDoc(userRef, {
      cart: newCart,
      wishlist: newWishlist
    });
  } else if (newWishlist.length !== 0) {
    await updateDoc(userRef, {
      wishlist: newWishlist
    });
  } else if (newCart.length !== 0) {
    await updateDoc(userRef, {
      cart: newCart,
    });
  }
}

export const removeFromCart = async (uid: string, productID: string, dispatch: Function) => {
  const id = toast.loading("Please wait...");
  try {
    const userRef = doc(fireStoreDB, `users/${uid}`);
    const userCart = await getCart(uid);
    const newCart = userCart.filter((item: any) => item.id !== productID) || []
    await updateDoc(userRef, {
      cart: newCart
    });
    dispatch(REMOVE_FROM_WISHLIST(newCart))
    toast.update(id, { render: "Removed from Cart!.", type: "success", isLoading: false, autoClose: 3000, closeOnClick: true, pauseOnHover: true, });
  } catch (error) {
    toast.update(id, { render: "Sorry! Try again later...", type: "error", isLoading: false, closeOnClick: true, pauseOnHover: true, });
  }
}