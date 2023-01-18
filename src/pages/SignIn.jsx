import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import Oauth from "../components/Oauth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredentials.user) {
        navigate("/profile");
      }
    } catch (error) {
      toast.error("Bad user credentials");
    }
  };

  return (
    <div>
      <header>
        <h2>Welcome Back!</h2>
      </header>
      <main className="container">
        <form className="m-4 row" onSubmit={onSubmit}>
          <input
            type="email"
            className="border border-primary border-2 rounded-pill py-1 px-5 mb-3"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <div className="px-0 position-relative">
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
                className="showPassword"
                onClick={() => setShowPassword(!showPassword)}
              />
            </span>

            <div className="row justify-content-end">
              <Link
                to="/forgot-password"
                className="btn fw-bold row text-success w-auto"
              >
                Forgot Password
              </Link>
            </div>

            <div className="mt-5 d-flex justify-content-between align-items-center">
              <div className="fw-bolder">Sign In</div>
              <button className="btn btn-sm btn-success rounded-pill">
                <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
              </button>
            </div>
          </div>
        </form>
        <Oauth />
        <div className="row justify-content-center">
          <Link to="/sign-up" className="btn fw-bold row text-success w-auto">
            Sign Up Instead
          </Link>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
