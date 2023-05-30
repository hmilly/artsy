import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AiOutlineArrowRight } from "react-icons/ai";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Layout from "../components/Layout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset has been sent. Please check your Emails");
    } catch (error) {
      toast.error("Error! Email is not currently in use!");
    }
  };

  return (
    <Layout>
      <h2 className="my-3">Forgot Password</h2>
      <Form onSubmit={onSubmit}>
        <Form.Control
          type="email"
          className="border border-primary border-1 rounded-pill py-2 px-5 mb-3"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChange}
          required
        />
        <Row className="justify-content-end">
          <Link to="/sign-in" className="btn fw-bold text-success w-auto">
            Sign in Instead
          </Link>
        </Row>
        <Row className="my-5 justify-content-between align-items-center ">
          <Col className="col-auto">
            <p className="m-0">Click to sign in</p>
          </Col>
          <Col className="col-auto">
            <button className="btn btn-success rounded-pill">
              <AiOutlineArrowRight className="img-fluid" aria-label="arrow right"/>
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ForgotPassword;
