import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form, Row, Col } from "react-bootstrap";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineArrowRight,
} from "react-icons/ai";
import Oauth from "../components/Oauth";
import Layout from "../components/Layout";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const sumbitForm = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      if (userCredentials.user) {
        localStorage.setItem("user", `${auth.currentUser.uid}`);
        navigate("/profile");
      }
    } catch (error) {
      toast.error("Bad user credentials");
      console.log(error);
    }
  };

  return (
    <Layout>
      <h2 className="my-3">Welcome Back!</h2>
      <Form onSubmit={sumbitForm}>
        <Form.Control
          type="email"
          className="border border-primary border-1 rounded-pill py-2 px-5 mb-3"
          placeholder="Email"
          id="email"
          value={formData.email}
          onChange={onChange}
          required
        />
        <Form.Group className="border border-primary border-1 rounded-pill py-1 pe-1 ps-5 gap-1 d-flex ">
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
        <Row className="justify-content-end">
          <Link
            to="/forgot-password"
            className="btn fw-bold text-success w-auto"
          >
            Forgot Password
          </Link>
        </Row>
        <Row className="my-5 justify-content-between align-items-center ">
          <Col className="col-auto">
            <p className="m-0">Click to sign in</p>
          </Col>
          <Col className="col-auto">
            <button className="btn btn-success rounded-pill">
              <AiOutlineArrowRight className="img-fluid" />
            </button>
          </Col>
        </Row>
      </Form>
      {/* oauth */}
      <Oauth />
      <Row>
        <Link to="/sign-up" className="btn fw-bold text-success">
          Sign Up Instead
        </Link>
      </Row>
    </Layout>
  );
};

export default SignIn;
