import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonVcardFill } from "react-icons/bs";
import personIcon from "../assets/svg/personIcon.svg";

const Header = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    auth.currentUser !== null ? setUserLoggedIn(true) : setUserLoggedIn(false);
  }, [auth.currentUser]);

  const logOut = () => auth.signOut().then(() => navigate("/"));

  return (
    <header className="mb-4">
      <nav className="navbar sticky-top navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand w-50 text-center" href="#">
            Artsy
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarBasic"
            aria-controls="navbarBasic"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNav(!showNav)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse justify-content-end 
          ${showNav && "show"}
          `}
            id="navbarBasic"
          >
            <ul className="navbar-nav align-items-end">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  <AiFillHome className="img-fluid" />
                </Link>
              </li>

              {userLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                      <BsFillPersonVcardFill className="img-fluid text-dark" />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-link-dark"
                      type="button"
                      onClick={logOut}
                    >
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/sign-in">
                      Sign in
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/sign-up">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
