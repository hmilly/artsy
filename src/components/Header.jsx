import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { Nav } from "react-bootstrap";

const Header = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  useMemo(() => {
    auth.currentUser !== null ? setUserLoggedIn(true) : setUserLoggedIn(false);
  }, [auth.currentUser]);

  const logOut = () => auth.signOut().then(() => navigate("/"));

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

        {userLoggedIn ? (
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
