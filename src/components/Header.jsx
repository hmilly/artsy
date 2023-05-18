import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { AiFillHome, AiOutlinePicture, AiOutlineShop } from "react-icons/ai";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { Nav, Row, Col } from "react-bootstrap";

const Header = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [userId] = useState(localStorage.getItem("user"));

  const logOut = () => {
    localStorage.removeItem("user");
    auth.signOut().then(() => navigate("/"));
  };

  return (
    <header className="navbar flex-fill fixed-top bg-dark flex-sm-row flex-column py-1">
      <Link
        to="/"
        className="navbar-brand text-center text-light m-0 p-0 flex-fill"
      >
        <h1 className="p-0 m-0">Artsy</h1>
      </Link>
      <Nav
        activeKey="/home"
        as="ul"
        className="flex-sm-row flex-column gap-2 flex-fill justify-content-evenly"
      >
        <Row className="row-cols-1 row-cols-sm-2 flex-sm-row flex-fill">
          <Col className="d-flex justify-content-evenly p-1">
            <Nav.Item as="li">
              <Link to="/" className="p-1 text-light">
                <AiFillHome className="img-fluid" />
              </Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Link to="/sellers" className="p-1 text-light">
                <AiOutlineShop className="img-fluid" />
              </Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Link to="/paintings" className="p-1 text-light">
                <AiOutlinePicture className="img-fluid" />
              </Link>
            </Nav.Item>
          </Col>
          {userId !== null ? (
            // user logged in - show profile btn & log out
            <Col className="d-flex justify-content-evenly p-1">
              <Nav.Item as="li">
                <Link to="/profile" className="p-1 text-light">
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
            </Col>
          ) : (
            // no user logged in - sign in / up btn
            <Col className="d-flex flex-fill justify-content-evenly p-1">
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
            </Col>
          )}
        </Row>
      </Nav>
    </header>
  );
};

export default Header;
