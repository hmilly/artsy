import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Row, Col, Form, Dropdown } from "react-bootstrap";

const PaintingsPgFilters = ({ paintings, setPaintings }) => {
  const [allPaintings] = useState(paintings);
  // const [arr, setArr] = useState([]);

  const searchByName = (e) => {
    const match = allPaintings.filter((painting) =>
      painting.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setPaintings(match);
  };

  const searchByType = (e) => {
    if (e.target.checked) {
      const match = allPaintings.filter((painting) =>
        painting.description.toLowerCase().includes(e.target.id.toLowerCase())
      );
      console.log(match);
    }

    //  setPaintings(match);
  };

  return (
    <Row
      as="form"
      className="p-2 row-cols-1 row-cols-md-3 align-items-center justify-content-center"
    >
      <Col className="mb-3">
        <Form.Group className="border border-primary border-1 rounded p-1 pe-1 ps-2 gap-1 d-flex">
          <BiSearch className="m-auto" />
          <Form.Control
            type="search"
            placeholder="Search by name"
            className="border-0 p-1"
            aria-label="Search"
            onKeyUp={searchByName}
          />
        </Form.Group>
      </Col>
      <Col className="mb-3">
        <Form.Group className="p-1 pe-1 ps-2 gap-1 d-flex flex-column">
          <Form.Label>Price</Form.Label>
          <Form.Range />
        </Form.Group>
      </Col>
      <Col className="mb-3">
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            className=" border rounded border-primary w-100"
            id="dropdown-button"
          >
            Painting Style
          </Dropdown.Toggle>
          <Dropdown.Menu variant="light" className="px-4 w-100">
            {["checkbox"].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                <Form.Check
                  label="Abstract"
                  id="Abstract"
                  onChange={searchByType}
                  type={type}
                />
                <Form.Check
                  label="Acrylic"
                  id="Acrylic"
                  onChange={searchByType}
                  type={type}
                />
                <Form.Check
                  label="Colourful"
                  id="Colourful"
                  onChange={searchByType}
                  type={type}
                />
                <Form.Check
                  label="Digital"
                  id="Digital"
                  onChange={searchByType}
                  type={type}
                />
                <Form.Check
                  label="Expressionism"
                  id="Expressionism"
                  onChange={searchByType}
                  type={type}
                />
                <Form.Check
                  label="Impressionism"
                  id="Impressionism"
                  onChange={searchByType}
                  type={type}
                />
                <Form.Check
                  label="Landscape"
                  id="Landscape"
                  onChange={searchByType}
                  type={type}
                />
                <Form.Check
                  label="Oil"
                  id="Oil"
                  onChange={searchByType}
                  type={type}
                />
                <Form.Check
                  label="Pastel"
                  id="Pastel"
                  onChange={searchByType}
                  type={type}
                />
                <Form.Check
                  label="Pop Art"
                  id="Pop Art"
                  onChange={searchByType}
                  type={type}
                />
                <Form.Check
                  label="Portrait"
                  id="Portrait"
                  onChange={searchByType}
                  type={type}
                />
                <Form.Check
                  label="Spray Paint"
                  id="Spray Paint"
                  onChange={searchByType}
                  type={type}
                />
                <Form.Check
                  label="Still life"
                  id="Still life"
                  onChange={searchByType}
                  type={type}
                />
                <Form.Check
                  label="Surreal"
                  id="Surreal"
                  onChange={searchByType}
                  type={type}
                />
                <Form.Check
                  label="Watercolour"
                  id="Watercolour"
                  onChange={searchByType}
                  type={type}
                />
              </div>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default PaintingsPgFilters;
