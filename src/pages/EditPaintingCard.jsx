import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
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
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import LoadingState from "../components/LoadingState";
import PaintingForm from "../components/PaintingForm";
import Layout from "../components/Layout";
import { fetchPaintingById } from "../fns/fetchFns";

const EditPaintingCard = () => {
  const params = useParams();
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imgUrl: "",
    imgData: "",
  });


  console.log(auth.currentUser.displayName)
  
  useEffect(() => {
    const getPaintingData = async () => {
      const painting = await fetchPaintingById(params.paintingId);
      setFormData(painting);
      setLoading(false);
    };
    getPaintingData();
  }, [params.paintingId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // store image in firebase
    const storeImage = async (image) => {
      return new Promise((res, rej) => {
        const storage = getStorage();
        const fileName = `${params.paintingId}-${formData.name}-${uuidv4()}`;

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

    const img = await storeImage(formData.imgData);

    const formDataCopy = {
      ...formData,
      img,
      timestamp: serverTimestamp(),
    };

    delete formDataCopy.imgUrl;
    delete formDataCopy.imgData;

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
      <Container as="main">
        <h2 className="my-5">Edit Painting card</h2>
        <Row className="flex-column flex-md-row ">
          <Col>
            <Form
              onSubmit={onSubmit}
              className="h-100 d-flex flex-column justify-content-between"
            >
              <PaintingForm formData={formData} setFormData={setFormData} />
              <Button type="submit" className="btn-success my-2 w-100">
                Edit Listing
              </Button>
            </Form>
          </Col>
          <Col>
            <img
              src={formData?.imgUrl}
              alt={formData?.name}
              className="img-fluid p-2"
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default EditPaintingCard;
