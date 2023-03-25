import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { Container, Form, Row, Col } from "react-bootstrap";
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
      <Container as="main">
        <h2>Forgot Password</h2>
        <Row as="form" onSubmit={onSubmit} className="m-2 m-sm-4">
          <Form.Control
            type="email"
            className="border-primary border-2 rounded-pill py-1 px-5 mb-3"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
        </Row>
        <Row className="m-2 m-sm-4 justify-content-end">
          <Link to="/sign-in" className="btn fw-bold row text-success w-auto">
            Sign in Instead
          </Link>
        </Row>
        <Row className="m-2 m-sm-4 flex-row mt-4 justify-content-between align-items-center">
          <Col className="col-auto">
            <div className="fw-bolder">Send Reset Link</div>
          </Col>
          <Col className="d-flex justify-content-end col-3">
            <button className="btn btn-success rounded-pill">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ForgotPassword;
