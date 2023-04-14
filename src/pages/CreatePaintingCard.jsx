import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import LoadingState from "../components/LoadingState";
import PaintingForm from "../components/PaintingForm";
import Layout from "../components/Layout";

const CreatePaintingCard = () => {
  const auth = getAuth();
  const isMounted = useRef(true);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imgUrl: "",
    imgData: "",
    reservedById: "",
    sellerId: "",
  });

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, sellerId: user.uid });
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

    // store image in firebase
    const storeImage = async (image) => {
      return new Promise((res, rej) => {
        const storage = getStorage();
        const fileName = `${formData.name.trim().replace(" ", "-")}-${
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

    const img = await storeImage(formData.imgData[0]);

    const formDataCopy = {
      ...formData,
      imgUrl: img,
      timestamp: serverTimestamp(),
    };
    delete formDataCopy.imgData;

    const paintingRef = await addDoc(collection(db, "paintings"), formDataCopy);
    setLoading(false);
    toast.success("Painting saved");
    navigate(`/profile`);
  };

  if (loading) {
    return <LoadingState />;
  }
  return (
    <Layout>
      <Container>
        <h2 className="my-5">Create Painting card</h2>
        <Row className="flex-column flex-md-row ">
          <Col>
            <Form
              onSubmit={onSubmit}
              className="h-100 d-flex flex-column justify-content-between"
            >
              <PaintingForm formData={formData} setFormData={setFormData} />
              <Button type="submit" className="btn-success my-2 w-100">
                Upload
              </Button>
            </Form>
          </Col>
          {formData.imgData !== "" && (
            <Col>
              <img
                src={formData?.imgUrl}
                alt={formData?.name}
                className="img-fluid p-2"
              />
            </Col>
          )}
        </Row>
      </Container>
    </Layout>
  );
};

export default CreatePaintingCard;
