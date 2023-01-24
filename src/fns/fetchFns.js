import {
  updateDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";

export const fetchPaintings = async (sellerId) => {
  try {
    // if sellerId matches params id (seller id) get paintings from collection
    const paintingsRef = collection(db, "paintings");
    const q = query(paintingsRef, where("sellerId", "==", sellerId));
    const querySnap = await getDocs(q);

    // push paintings to array
    const paintings = [];
    querySnap.forEach((doc) => {
      return paintings.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    // return array
    return paintings;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUser = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  const sellerRef = doc(db, "sellers", userId);
  const sellerSnap = await getDoc(sellerRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else if (sellerSnap.exists()) {
    return sellerSnap.data();
  } else {
    console.log("can't find user");
  }
};