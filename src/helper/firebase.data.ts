import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../redux/slices/user";
import { fireStoreDB } from "./firebase.config";

export const getUserData = async (uid: string) => {
  const docRef = doc(fireStoreDB, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export const createUserData = async (uid: string, userType: string, userName?: string) => {
  await setDoc(doc(fireStoreDB, "users", uid), {
    userName: userName ? userName : null,
    uid: uid,
    type: userType,
    wishlist: [],
    cart: []
  });
}

export const getWishlist = async (uid: string) => {
  const docRef = doc(fireStoreDB, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data()?.wishlist;
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