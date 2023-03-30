import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { Container, Form, Row, Col } from "react-bootstrap";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineArrowRight,
} from "react-icons/ai";
import Oauth from "../components/Oauth";
import Layout from "../components/Layout";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    description: "",
  });

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userType === "") {
      toast.error("Please select account type");
    } else {
      try {
        const auth = getAuth();

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        // update user name & phone number
        auth.currentUser.displayName = formData.name;
        auth.currentUser.phoneNumber = formData.number;

        const formDataCopy = { ...formData, userRef: userType };
        delete formDataCopy.password;
        formDataCopy.serverTimestamp = serverTimestamp();

        await setDoc(doc(db, userType, userCredential.user.uid), formDataCopy);
        navigate("/profile");
      } catch (error) {
        toast.error("Something went wrong with validation");
        console.log(error);
      }
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <Layout>
      <Container as="main">
        <h2 className="my-3">Welcome</h2>
        <Form onSubmit={onSubmit}>
          <Form.Control
            type="text"
            className="border border-primary border-1 rounded-pill py-2 px-5 mb-3"
            placeholder="Name"
            id="name"
            value={formData.name}
            onChange={onChange}
            required
          />
          <Form.Control
            type="email"
            className="border border-primary border-1 rounded-pill py-2 px-5 mb-3"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={onChange}
            required
          />
          <Form.Control
            type="tel"
            className="border border-primary border-1 rounded-pill py-2 px-5 mb-3"
            placeholder="Phone Number"
            id="number"
            value={formData.number}
            onChange={onChange}
            required
          />
          <div className="border border-primary border-1 rounded py-2 px-5 mb-3">
            <p>Please select which account you'd like to sign up for:</p>
            {["radio"].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                <Form.Check
                  inline
                  type={type}
                  name="user_type"
                  value="users"
                  required
                  onChange={(e) => setUserType(e.target.value)}
                  id="radioTypeCustomer"
                  label="Customer"
                />
                <Form.Check
                  inline
                  type={type}
                  name="user_type"
                  value="sellers"
                  required
                  onChange={(e) => setUserType(e.target.value)}
                  id="radioTypeSeller"
                  label="Seller"
                />
              </div>
            ))}
          </div>
          {userType === "sellers" && (
            <Form.Group className="border border-primary border-1 rounded py-2 px-4 mb-3">
              <Form.Label>
                Introduce your shop by adding an about me:
              </Form.Label>
              <Form.Control
                as="textarea"
                className="form-control h-75"
                style={{ resize: "none" }}
                type="text"
                value={formData.description}
                onChange={onChange}
                id="description"
                rows={4}
              />
            </Form.Group>
          )}
          <Form.Group className="border border-primary border-1 rounded-pill py-1 pe-1 ps-5  d-flex">
            <Form.Control
              type={showPassword ? "text" : "password"}
              className="border-0 p-1"
              placeholder="Password"
              id="password"
              value={formData.password}
              onChange={onChange}
              required
            />
            <button
              className="btn btn-dark rounded-pill py-0"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <AiFillEyeInvisible className="img-fluid" />
              ) : (
                <AiFillEye className="img-fluid" />
              )}
            </button>
          </Form.Group>
          <Row className="my-5 justify-content-between align-items-center ">
            <Col className="col-auto">
              <p className="m-0">Click to sign up</p>
            </Col>
            <Col className="col-auto">
              <button className="btn btn-success rounded-pill">
                <AiOutlineArrowRight className="img-fluid" />
              </button>
            </Col>
          </Row>
        </Form>
        <Oauth />
        <Row>
          <Link to="/sign-in" className="btn fw-bold text-success">
            Sign In Instead
          </Link>
        </Row>
      </Container>
    </Layout>
  );
};

export default SignUp;
