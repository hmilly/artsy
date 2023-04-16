import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { toast } from "react-toastify";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import LoadingState from "../components/LoadingState";
import PaintingForm from "../components/PaintingForm";
import Layout from "../components/Layout";
import { fetchPaintingById } from "../fns/fetchFns";

const EditPaintingCard = () => {
  const auth = getAuth();
  const isMounted = useRef(true);
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const getPaintingData = async () => {
      const painting = await fetchPaintingById(params.paintingId);
      setLoading(false);
      if (painting.sellerId === auth.currentUser.uid) {
        setFormData({ ...formData, ...painting });
      } else {
        toast.error("You cannot edit that listing");
        navigate("/");
      }
    };
    getPaintingData();
  }, [params.paintingId]);

  console.log(formData);

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

    let formDataCopy = { ...formData, timestamp: serverTimestamp() };
    // need to update name of painting in storage file
    // in case of  name change
    // in case of new picture added

    if (formData.imgData !== "") {
      const img = await storeImage(formData.imgData[0]);
      formDataCopy = { ...formDataCopy, imgUrl: img };
    }

    delete formDataCopy.imgData;
    const paintingRef = doc(db, "paintings", params.paintingId);
    await updateDoc(paintingRef, formDataCopy);

    setLoading(false);
    toast.success(`Painting card ${formData.name} updated`);
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
