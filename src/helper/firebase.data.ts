import { doc, getDoc, setDoc } from "firebase/firestore";
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