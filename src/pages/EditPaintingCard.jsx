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
import { Container, Row, Col, Button } from "react-bootstrap";
import LoadingState from "../components/LoadingState";
import EditForm from "../components/EditForm";
import Layout from "../components/Layout";

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
    return <LoadingState />;
  }
  return (
    <Layout>
      <Container as="main" className="h-100">
        <Row className="flex-column flex-md-row gap-3">
          <Col as="form" onSubmit={onSubmit} className="p-2">
            <EditForm formData={formData} setFormData={setFormData} />
            <Button type="submit" className="btn-success my-2 w-100">
              Edit Listing
            </Button>
          </Col>
          <Col>
            <img
              src={paintingData?.imgUrl}
              alt={paintingData?.name}
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default EditPaintingCard;
