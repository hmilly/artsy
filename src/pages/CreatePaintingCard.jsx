import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { db } from "../firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { storeImage } from "../fns/fetchFns";
import LoadingState from "../components/LoadingState";
import Layout from "../components/Layout";
import SellerPaintingForm from "../components/SellerPaintingForm";

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
    const img = await storeImage(formData.imgData[0], formData.name);

    const formDataCopy = {
      ...formData,
      imgUrl: img,
      timestamp: serverTimestamp(),
    };
    delete formDataCopy.imgData;

    await addDoc(collection(db, "paintings"), formDataCopy);
    setLoading(false);
    toast.success(`Painting card for ${formData.name} created`);
    navigate(`/profile`);
  };

  if (loading) {
    return <LoadingState />;
  }
  return (
    <Layout>
      <h2 className="my-5">Create Painting card</h2>
      <Row className="flex-column flex-md-row ">
        <Col>
          <Form
            onSubmit={onSubmit}
            className="h-100 d-flex flex-column justify-content-between"
          >
            <SellerPaintingForm formData={formData} setFormData={setFormData} />
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
    </Layout>
  );
};

export default CreatePaintingCard;
