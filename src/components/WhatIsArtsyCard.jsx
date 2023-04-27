import React from "react";
import { Row, Col } from "react-bootstrap";

const WhatIsArtsyCard = () => {
  return (
    <>
      <Row className="p-3">
        <h3 className="text-center px-2">What is Artsy?</h3>
      </Row>
      <Row className="g-5 p-4 row-cols-1 row-cols-lg-3 justify-content-between text-center">
        <Col>
          <h4>A community doing good</h4>
          <p>
            Artsy is an online marketplace, where people come together to make,
            sell, buy and collect unique art. We’re also a community pushing for
            positive change for small businesses, people, and the planet.
          </p>
        </Col>
        <Col>
          <h4>Support independent creators</h4>
          <p>
            There’s no Artsy warehouse – just millions of people selling the
            things they love. We make the whole process easy, helping you
            connect directly with makers to find something extraordinary.
          </p>
        </Col>
        <Col>
          <h4>Peace of mind</h4>
          <p>
            Your privacy is the highest priority of our dedicated team. And if
            you ever need assistance, we to help.
          </p>
        </Col>
      </Row>
    </>
  );
};

export default WhatIsArtsyCard;
