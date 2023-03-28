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
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { Container, Form } from "react-bootstrap";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineArrowRight,
} from "react-icons/ai";

import visibilityIcon from "../assets/svg/visibilityIcon.svg";
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
        <h2>Welcome</h2>
        <Form className="m-4" onSubmit={onSubmit}>
          <Form.Control
            type="text"
            className="border border-primary border-2 rounded-pill py-1 px-5 mb-3"
            placeholder="Name"
            id="name"
            value={formData.name}
            onChange={onChange}
            required
          />
          <Form.Control
            type="email"
            className="border border-primary border-2 rounded-pill py-1 px-5 mb-3"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={onChange}
            required
          />
          <Form.Control
            type="tel"
            className="border border-primary border-2 rounded-pill py-1 px-5 mb-3"
            placeholder="Phone Number"
            id="number"
            value={formData.number}
            onChange={onChange}
            required
          />

          <div className="border border-primary border-2 rounded py-1 px-5 mb-3">
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
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
              className="border border-primary border-2 rounded py-2 px-4 mb-3"
            >
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

          <Form.Group
            className="d-flex
            border border-primary border-2 rounded-pill py-1 px-5 w-100 mb-3"
          >
            <Form.Control
              type={showPassword ? "text" : "password"}
              className="w-100 border-0"
              placeholder="Password"
              id="password"
              value={formData.password}
              onChange={onChange}
              required
            />

            <button
              className="btn btn-sm btn-dark rounded-pill "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiFillEyeInvisible className="img-fluid" />
              ) : (
                <AiFillEye className="img-fluid" />
              )}
            </button>
          </Form.Group>

          <div className="mt-5 d-flex justify-content-between align-items-center ">
            <div className="fw-bolder">Click to sign up</div>
            <button className="btn btn-sm btn-success rounded-pill py-2 px-3 ">
              <AiOutlineArrowRight className="img-fluid" />
            </button>
          </div>
        </Form>
        <Oauth />

        <div className="row justify-content-center">
          <Link to="/sign-in" className="btn fw-bold row text-success w-auto">
            Sign In Instead
          </Link>
        </div>
      </Container>
    </Layout>
  );
};

export default SignUp;
