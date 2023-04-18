import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { Nav } from "react-bootstrap";

const Header = () => {
  const [userId] = useState(localStorage.getItem("user"));

  const auth = getAuth();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("user");
    auth.signOut().then(() => navigate("/"));
  };

  return (
    <header className="mb-4 navbar sticky-top navbar-light bg-light flex-sm-row flex-column">
      <Link to="/" className="navbar-brand text-center m-0 w-25 flex-fill">
        Artsy
      </Link>
      <Nav
        activeKey="/home"
        as="ul"
        className="p-2 gap-1 flex-fill align-items-center justify-content-end"
      >
        <Nav.Item as="li">
          <Link to="/" className="p-3 text-dark">
            <AiFillHome className="img-fluid" />
          </Link>
        </Nav.Item>

        {userId !== null ? (
          <>
            <Nav.Item as="li">
              <Link to="/profile" className="p-3 text-dark">
                <BsFillPersonVcardFill className="img-fluid " />
              </Link>
            </Nav.Item>
            <Nav.Item as="li">
              <button
                className="btn btn-link-dark text-decoration-underline"
                type="button"
                onClick={logOut}
              >
                Log Out
              </button>
            </Nav.Item>
          </>
        ) : (
          <>
            <Nav.Item as="li">
              <Link
                to="/sign-in"
                className="text-decoration-underline p-1 text-dark"
              >
                Sign in
              </Link>
            </Nav.Item>

            <Nav.Item as="li">
              <Link
                to="/sign-up"
                className="text-decoration-underline p-1 text-dark"
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
