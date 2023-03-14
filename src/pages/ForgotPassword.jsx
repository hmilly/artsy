import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
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
      <main className="container">
        <h2>Forgot Password</h2>
        <form className="m-4 row" onSubmit={onSubmit}>
          <input
            type="email"
            className="border border-primary border-2 rounded-pill py-1 px-5 mb-3"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <div className="row justify-content-end">
            <Link to="/sign-in" className="btn fw-bold row text-success w-auto">
              Sign in Instead
            </Link>
          </div>
          <div className="mt-5 d-flex justify-content-between align-items-center">
            <div className="fw-bolder">Send Reset Link</div>
            <button className="btn btn-sm btn-success rounded-pill">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
      </main>
    </Layout>
  );
};

export default ForgotPassword;
