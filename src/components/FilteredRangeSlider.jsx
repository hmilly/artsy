import { useState, useMemo } from "react";
import { Col, Form } from "react-bootstrap";

const FilteredRangeSlider = ({ paintings, setPaintings }) => {
  //const [allPaintings] = useState(paintings);
  const [costs, setCosts] = useState([]);

  useMemo(() => {
    const prices = paintings.map((p) => +p.price).sort();
    setCosts(prices);
  }, [paintings]);

  return (
    <Col className="mb-3">
      <Form.Group className="bg-light border rounded border-secondary border-opacity-50  p-1 gap-1 d-flex flex-column">
        <Form.Label className="d-flex justify-content-between">
          <p className="m-0 p-0">£{costs[0]}</p>
          <p className="m-0 p-0">Price</p>
          <p className="m-0 p-0">£{costs[costs.length - 1]}</p>
        </Form.Label>
        <Form.Range className="flex-1" />
      </Form.Group>
    </Col>
  );
};

export default FilteredRangeSlider;
