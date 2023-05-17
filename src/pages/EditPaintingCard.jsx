import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import LoadingState from "../components/LoadingState";
import SellerPaintingForm from "../components/SellerPaintingForm";
import Layout from "../components/Layout";
import {
  fetchPaintingById,
  deleteFromStorage,
  storeImage,
} from "../fns/fetchFns";

const EditPaintingCard = () => {
  const auth = getAuth();
  const isMounted = useRef(true);
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [prevRef, setPrevRef] = useState("");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const getPaintingData = async () => {
            const painting = await fetchPaintingById(params.paintingId);
            setFormData({ imgData: "", ...painting });
            setPrevRef(painting.imgUrl);
            setLoading(false);
          };
          getPaintingData();
        } else {
          navigate("/sign-in");
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line
  }, [isMounted, params.paintingId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let formDataCopy = { ...formData, timestamp: serverTimestamp() };

    if (formData.imgData !== "") {
      // delete old painting from storage bucket
      deleteFromStorage(prevRef);

      // upload new painting
      const img = await storeImage(formData.imgData[0], formData.name);
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
              <SellerPaintingForm
                formData={formData}
                setFormData={setFormData}
              />
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
