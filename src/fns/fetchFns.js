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

export const fetchPaintings = async (userId) => {
  try {
    // if sellerId matches params id (seller id) get paintings from collection
    const paintingsRef = collection(db, "paintings");
    const q = query(paintingsRef, where("sellerId", "==", userId));
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
