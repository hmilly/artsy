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
    <div>
      <header>
        <h2>Welcome</h2>
      </header>
      <main className="container">
        <form className="m-4 row" onSubmit={onSubmit}>
          <input
            type="text"
            className="border border-primary border-2 rounded-pill py-1 px-5 mb-3"
            placeholder="Name"
            id="name"
            value={name}
            onChange={onChange}
            required
          />
          <input
            type="email"
            className="border border-primary border-2 rounded-pill py-1 px-5 mb-3"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
            required
          />
          <input
            type="number"
            className="border border-primary border-2 rounded-pill py-1 px-5 mb-3"
            placeholder="Phone Number"
            id="number"
            value={number}
            onChange={onChange}
            required
          />

          <div className="border border-primary border-2 rounded-pill py-1 px-5 mb-3">
            <p>Please select which account you'd like to sign up for:</p>

            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="user_type"
                value="customer"
                onChange={(e) => setUserType(e.target.value)}
                required
                id="inlineRadioDefault"
              />
              <label class="form-check-label" for="inlineRadioDefault">
                Customer
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="user_type"
                value="seller"
                onChange={(e) => setUserType(e.target.value)}
                required
                id="inlineRadioChecked"
              />
              <label class="form-check-label" for="inlineRadioChecked">
                Seller
              </label>
            </div>
          </div>

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
                value={password}
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
    </div>
  );
};

export default SignUp;
