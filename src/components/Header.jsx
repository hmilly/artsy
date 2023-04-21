import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { Nav } from "react-bootstrap";

const Header = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [userId] = useState(localStorage.getItem("user"));

  const logOut = () => {
    localStorage.removeItem("user");
    auth.signOut().then(() => navigate("/"));
  };

  return (
    <header className="navbar fixed-top bg-dark flex-sm-row flex-column">
      <Link
        to="/"
        className="navbar-brand text-center text-light m-0 w-25 flex-fill"
      >
        <h1 className="d-inline">Artsy</h1>
      </Link>
      <Nav
        activeKey="/home"
        as="ul"
        className="p-2 gap-1 flex-fill align-items-center justify-content-end"
      >
        <Nav.Item as="li">
          <Link to="/" className="p-3 text-light">
            <AiFillHome className="img-fluid" />
          </Link>
        </Nav.Item>
        {userId !== null ? (
          // user logged in - show profile btn & log out
          <>
            <Nav.Item as="li">
              <Link to="/profile" className="p-3 text-light">
                <BsFillPersonVcardFill className="img-fluid " />
              </Link>
            </Nav.Item>
            <Nav.Item as="li">
              <button
                className="btn btn-link link-light text-decoration-underline"
                type="button"
                onClick={logOut}
              >
                Log Out
              </button>
            </Nav.Item>
          </>
        ) : (
          // no user logged in - sign in / out btn
          <>
            <Nav.Item as="li">
              <Link
                to="/sign-in"
                className="text-decoration-underline p-1 text-light"
              >
                Sign in
              </Link>
            </Nav.Item>

            <Nav.Item as="li">
              <Link
                to="/sign-up"
                className="text-decoration-underline p-1 text-light"
              >
                Sign Up
              </Link>
            </Nav.Item>
          </>
        )}
      </Nav>
    </header>
  );
};

export default Header;
