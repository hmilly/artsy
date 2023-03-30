import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase.config";
import { Card } from "react-bootstrap";
import LoadingState from "../components/LoadingState";
import Layout from "../components/Layout";
import PaintingForm from "../components/PaintingForm";
import { Form, Button, Container } from "react-bootstrap";

const CreatePaintingCard = () => {
  const params = useParams();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imgUrl: "",
  });
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <LoadingState />;
  }
  return (
    <Layout>
      <Container>
        <Form>
          <PaintingForm formData={formData} setFormData={setFormData} />
          <Button type="submit" className="btn-success my-2 w-100">
            Upload
          </Button>
        </Form>
      </Container>
    </Layout>
  );
};

export default CreatePaintingCard;
