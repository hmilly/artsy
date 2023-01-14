import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../firebase.config";
import { doc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { uuidv4 } from "@firebase/util";
import Spinner from "../components/Spinner";
import FormBody from "../components/FormBody";

const EditListing = () => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    name: "",
    price: 0,
    reserved: false,
    imgUrl: "",
    reservedBy: {
      displayName: "",
      userId: "",
    },
  });

  const { image } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);
  const params = useParams();

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

  useEffect(() => {
    if (listing && listing.userRef !== auth.currentUser.uid) {
      toast.error("You cannot edit that listing");
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchListing = async () => {
      const docRef = doc(db, "paintings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setFormData({ ...docSnap.data(), address: docSnap.data().location });
        setLoading(false);
      } else {
        navigate("/");
        toast.error("Listing does not exist");
      }
    };

    fetchListing();
  }, [params.listingId, navigate]);

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

    const docRef = doc(db, "paintings", params.listingId);
    await updateDoc(docRef, formDataCopy);
    setLoading(false);
    toast.success("Listing saved");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="profile p-4">
      <header>
        <p className="pageHeader">Edit listing</p>
        <main>
          <form onSubmit={onSubmit}>
            <FormBody
              formData={formData}
              setFormData={setFormData}
            
            />
            <button type="submit" className="primaryButton createListingButton">
              Edit Listing
            </button>
          </form>
        </main>
      </header>
    </div>
  );
};

export default EditListing;
