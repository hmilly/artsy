import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase.config";
import { Card } from "react-bootstrap";
import Spinner from "../components/Spinner";
import Layout from "../components/Layout";
import EditForm from "../components/EditForm";
import { Form, Button } from "react-bootstrap";

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
    return <Spinner />;
  }
  return (
    <Layout>
      <Form>
        <EditForm formData={formData} setFormData={setFormData} />
        <Button type="submit" className="btn-success my-2 w-100">
          Upload
        </Button>
      </Form>
    </Layout>
  );
};

export default CreatePaintingCard;
