import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { TCart } from "../types/user.types";
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
