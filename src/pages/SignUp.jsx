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

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const { name, email, number, password } = formData;
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userType === "") {
      toast.error("Please select account type");
    } else {
      try {
        const auth = getAuth();
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredentials.user;

        updateProfile(auth.currentUser, { displayName: name });

        const formDataCopy = { ...formData, userRef: userType };
        delete formDataCopy.password;
        formDataCopy.serverTimestamp = serverTimestamp();

        await setDoc(doc(db, "users", user.uid), formDataCopy);

        navigate("/profile");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong with validation");
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
    <>
      <div className="p-4">
        <header>
          <h2 className="pageHeader">Welcome</h2>
        </header>
        <main>
          <form className="m-4" onSubmit={onSubmit}>
            <input
              type="text"
              className="nameInput"
              placeholder="Name"
              id="name"
              value={name}
              onChange={onChange}
              required
            />

            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
              required
            />

            <input
              type="number"
              className="numberInput"
              placeholder="Phone Number"
              id="number"
              value={number}
              onChange={onChange}
              required
            />

            <div className="radioInputDiv d-flex flex-column justify-content-center">
              <p>Please select which account you'd like to sign up for:</p>
              <div className="customerTypeInputs">
                <label className="me-4">
                  <input
                    type="radio"
                    name="user_type"
                    value="customer"
                    onChange={(e) => setUserType(e.target.value)}
                    required
                  />
                    Customer
                </label>
                <label>
                  <input
                    type="radio"
                    name="user_type"
                    value="seller"
                    onChange={(e) => setUserType(e.target.value)}
                  />
                    Seller
                </label>
              </div>
            </div>

            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
                required
              />
              <img
                src={visibilityIcon}
                alt="show password"
                className="showPassword"
                onClick={() => setShowPassword(!showPassword)}
              />

              <div className="signUpBar">
                <p className="fw-bolder">Click to sign up</p>
                <button className="signUpButton">
                  <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
                </button>
              </div>
            </div>
          </form>
          <Oauth />
          <Link to="/sign-in" className="registerLink text-center">
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  );
};

export default SignUp;
