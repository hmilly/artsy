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
    <header className="fixed-top bg-dark">
      <Row as="nav" className="navbar row-cols-1 row-cols-sm-3">
        <Col
          as="ul"
          className="d-flex justify-content-evenly p-1 m-0 order-sm-1 order-2"
        >
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
        <Col className="order-sm-2 order-1">
          <Link to="/" className="text-center text-light m-0 p-0">
            <h1 className="p-0 m-0">Artsy</h1>
          </Link>
        </Col>
        {userId !== null ? (
          // user logged in - show profile btn & log out
          <Col
            as="ul"
            className="d-flex justify-content-evenly p-1 m-0 order-3 align-items-center"
          >
            <Nav.Item as="li">
              <Link to="/profile" className="p-1 text-light">
                <BsFillPersonVcardFill className="img-fluid " />
              </Link>
            </Nav.Item>
            <Nav.Item as="li">
              <button
                className="btn btn-link link-light"
                type="button"
                onClick={logOut}
              >
                Log Out
              </button>
            </Nav.Item>
          </Col>
        ) : (
          // no user logged in - sign in / up btn
          <Col
            as="ul"
            className="d-flex justify-content-evenly p-1 m-0 order-3"
          >
            <Nav.Item as="li">
              <Link to="/sign-in" className=" p-1 text-light">
                Sign in
              </Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Link to="/sign-up" className=" p-1 text-light">
                Sign Up
              </Link>
            </Nav.Item>
          </Col>
        )}
      </Row>
    </header>
  );
};

export default Header;
