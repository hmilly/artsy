import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { uuidv4 } from "@firebase/util";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import FormBody from "../components/FormBody";

const EditPaintingCard = () => {
  const params = useParams();
  const auth = getAuth();
  const navigate = useNavigate();
  const [paintingData, setPaintingData] = useState({});
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imgUrl: "",
  });

  useEffect(() => {
    const fetchPainting = async () => {
      const paintingsRef = doc(db, "paintings", params.paintingId);
      const paintingSnap = await getDoc(paintingsRef);

      setPaintingData(paintingSnap.data());
      setFormData(paintingSnap.data());
      setLoading(false);
    };
    fetchPainting();
  }, [params.paintingId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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

    const img = await storeImage(formData.imgUrl);

    const formDataCopy = {
      ...formData,
      img,
      timestamp: serverTimestamp(),
    };

    delete formDataCopy.imgUrl;

    const paintingRef = doc(db, "paintings", params.paintingId);
    await updateDoc(paintingRef, formDataCopy);
    setLoading(false);
    toast.success("Listing saved");
    navigate(`/profile`);
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="d-flex flex-column flex-md-row">
      <form onSubmit={onSubmit} className="col p-2 ">
        <FormBody formData={formData} setFormData={setFormData} />
        <div className="text-center">
          <button
            type="submit"
            className="btn w-75 btn-success rounded-pill"
          >
            Edit Listing
          </button>
        </div>
      </form>
      <div className="col my-auto">
        <img
          src={paintingData?.imgUrl}
          alt={paintingData?.name}
          className="img-fluid"
        />
      </div>
      {/* <div className="card-body">
        <h4 className="card-title">{paintingData?.name}</h4>
        <section>
          <p>Price {paintingData?.price}</p>
        </section>
      </div> */}
    </main>
  );
};

export default EditPaintingCard;
