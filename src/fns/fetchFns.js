import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db } from "../firebase.config";

const auth = getAuth();
const storage = getStorage();

// fetch paintings
export const fetchPaintingsArr = async (params, userId) => {
  try {
    // if params matches params id get paintings from collection
    const paintingsRef = collection(db, "paintings");
    const q = query(paintingsRef, where(params, "==", userId));
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

export const fetchPaintingById = async (paintingId) => {
  const paintingRef = doc(db, "paintings", paintingId);
  const paintingSnap = await getDoc(paintingRef);

  return paintingSnap.data();
};

// users by id
export const fetchUserById = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  const sellerRef = doc(db, "sellers", userId);
  const sellerSnap = await getDoc(sellerRef);
  // either return seller
  if (sellerSnap.exists()) {
    return sellerSnap.data();
    // or return normal user
  } else if (userSnap.exists()) {
    return userSnap.data();
  } else {
    console.log("can't find user");
  }
};

// for use in fetchAllSellerData
const fetchSellersCollection = async () => {
  const colRef = collection(db, "sellers");
  const docSnap = await getDocs(colRef);

  const arr = [];
  docSnap.forEach((doc) => arr.push({ ...doc.data(), id: doc.id }));

  return arr;
};

// for use in fetchAllSellerData
export const fetchPaintingsCollection = async () => {
  const colRef = collection(db, "paintings");
  const docSnap = await getDocs(colRef);

  const arr = [];
  docSnap.forEach((doc) => arr.push(doc.data()));

  return arr;
};

export const fetchAllSellerData = async () => {
  let arr = [];

  let userArr = await fetchSellersCollection();
  let paintingsArr = await fetchPaintingsCollection();
  // eslint-disable-next-line
  userArr.map((user) => {
    const matchedPaintings = paintingsArr.filter((p) => user.id === p.sellerId);
    arr.push({ ...user, paintings: matchedPaintings });
  });

  return arr;
};

// delete image from storage
export const deleteFromStorage = (painting) => {
  const imgRef = ref(
    storage,
    `paintings/${painting.split("%2F").pop().split("?")[0]}`
  );
  deleteObject(imgRef).catch((e) => console.log(e));
};

// upload image to storage
export const storeImage = async (image, formData) => {
  return new Promise((res, rej) => {
    const fileName = `${formData.trim().replace(" ", "-")}-${
      auth.currentUser.uid
    }`;

    const storageRef = ref(storage, "paintings/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      () => console.log("Upload is running"),
      (error) => rej(error),
      () =>
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          res(downloadURL);
        })
    );
  });
};
