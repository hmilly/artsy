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
      <main className="container">
        <h2>Welcome</h2>
        <form className="m-4 row" onSubmit={onSubmit}>
          <input
            type="text"
            className="border border-primary border-2 rounded-pill py-1 px-5 mb-3"
            placeholder="Name"
            id="name"
            value={formData.name}
            onChange={onChange}
            required
          />
          <input
            type="email"
            className="border border-primary border-2 rounded-pill py-1 px-5 mb-3"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={onChange}
            required
          />
          <input
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

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="user_type"
                value="users"
                onChange={(e) => setUserType(e.target.value)}
                required
                id="radioTypeCustomer"
              />
              <label className="form-check-label" htmlFor="radioTypeCustomer">
                Customer
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="user_type"
                value="sellers"
                onChange={(e) => setUserType(e.target.value)}
                required
                id="radioTypeSeller"
              />
              <label className="form-check-label" htmlFor="radioTypeSeller">
                Seller
              </label>
            </div>
          </div>
          {userType === "sellers" && (
            <div className="border border-primary border-2 rounded py-1 px-5 mb-3 ">
              <p>Introduce your shop by adding an about me:</p>
              <textarea
                className="form-control h-50"
                style={{ resize: "none" }}
                type="text"
                value={formData.description}
                onChange={onChange}
                id="description"
              />
            </div>
          )}
          <div className="px-0">
            <span
              className="d-flex
            border border-primary border-2 rounded-pill py-1 px-5 w-100 mb-3"
            >
              <input
                type={showPassword ? "text" : "password"}
                className="w-100 border-0"
                placeholder="Password"
                id="password"
                value={formData.password}
                onChange={onChange}
                required
              />
              <img
                src={visibilityIcon}
                alt="show password"
                className="btn"
                onClick={() => setShowPassword(!showPassword)}
              />
            </span>
            <div className="mt-5 d-flex justify-content-between align-items-center ">
              <div className="fw-bolder">Click to sign up</div>
              <button className="btn btn-sm btn-success rounded-pill">
                <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
              </button>
            </div>
          </div>
        </form>
        <Oauth />

        <div className="row justify-content-center">
          <Link to="/sign-in" className="btn fw-bold row text-success w-auto">
            Sign In Instead
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default SignUp;
