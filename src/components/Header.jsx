import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import homeIcon from "../assets/svg/homeIcon.svg";
import personIcon from "../assets/svg/personIcon.svg";

const Header = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    auth.currentUser !== null ? setUserLoggedIn(true) : setUserLoggedIn(false);
  }, [auth.currentUser]);

  const logOut = () => auth.signOut().then(() => navigate("/"));

  return (
    <header className="d-flex  justify-content-between w-100">
      <h1 className="w-50 text-center">Artsy</h1>

      <nav className="w-50 m-auto">
        <ul className="d-flex justify-content-between m-0 list-unstyled">
          <li>
            <Link to="/" className="btn btn-sm btn-outline-light">
              <img src={homeIcon} alt="home" className="img-fluid" />
            </Link>
          </li>
          {userLoggedIn ? (
            <>
              <li>
                <Link to="/profile" className="btn btn-sm btn-outline-light">
                  <img src={personIcon} alt="profile" className="img-fluid" />
                </Link>
              </li>

              <li>
                <button
                  className="btn btn-sm btn-success rounded-pill"
                  type="button"
                  onClick={logOut}
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="registerLink" to="/sign-in">
                  Sign in
                </Link>
              </li>
              <li>
                <Link className="registerLink" to="/sign-up">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
