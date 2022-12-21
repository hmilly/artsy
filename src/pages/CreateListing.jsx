import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../firebase.config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uuidv4 } from "@firebase/util";
import Spinner from "../components/Spinner";
import FormBody from "../components/FormBody";

const CreateListing = () => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    name: "",
    price: 0,
    reserved: false,
    imgUrl: ""
  });

  const { image } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (image.length > 1) {
      setLoading(false);
      toast.error("Only 1 image can be uploaded");
      return;
    }


    // store image in firebase
    const storeImage = async (image) => {
      return new Promise((res, rej) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, "images/" + fileName);

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

    const imgUrl = await Promise.all(
      [...image].map((img) => storeImage(img))
    ).catch(() => {
      setLoading(false);
      toast.error("Error, images not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrl,
      timestamp: serverTimestamp(),
    };

    delete formDataCopy.image;

    const docRef = await addDoc(collection(db, "paintings"), formDataCopy);
    setLoading(false);
    toast.success("Listing saved");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Create a listing</p>
        <main>
          <form onSubmit={onSubmit}>
            <FormBody
              formData={formData}
              setFormData={setFormData}
              geolocationEnabled={geolocationEnabled}
            />
            <button type="submit" className="primaryButton createListingButton">
              Create Listing
            </button>
          </form>
        </main>
      </header>
    </div>
  );
};

export default CreateListing;
