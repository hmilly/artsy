import { useState } from "react";
import { Col, Form, Dropdown } from "react-bootstrap";

const FilteredDropdown = ({ paintings, setPaintings }) => {
  // eslint-disable-next-line no-unused-vars
  const [allPaintings] = useState(paintings);
  const [styles, setStyles] = useState([]);

  const searchByStyle = (e) => {
    const findMatch = styles.find((style) => style.match(e.target.id));
    // provides array with all styles that are clicked - ON
    if (findMatch === undefined) {
      setStyles([...styles, e.target.id]);
    } else {
      const arr = styles;
      arr.splice(arr.indexOf(e.target.id), 1);
      setStyles(arr);
    }

    // matches paintings with singular style
    // const match = allPaintings.filter((painting) =>
    //   painting.description.toLowerCase().includes(e.target.id.toLowerCase())
    // );

    //  setPaintings(match);
  };

  return (
    <Col className="mb-3">
      <Dropdown>
        <Dropdown.Toggle
          variant="light"
          className="border rounded border-secondary border-opacity-50 w-100"
          id="dropdown-button"
        >
          Painting Style
        </Dropdown.Toggle>
        <Dropdown.Menu variant="light" className="px-5 w-100">
          {["checkbox"].map((type) => (
            <div key={`default-${type}`}>
              <Form.Check
                label="Abstract"
                id="Abstract"
                onChange={searchByStyle}
                type={type}
              />
              <Form.Check
                label="Acrylic"
                id="Acrylic"
                onChange={searchByStyle}
                type={type}
              />
              <Form.Check
                label="Colourful"
                id="Colourful"
                onChange={searchByStyle}
                type={type}
              />
              <Form.Check
                label="Digital"
                id="Digital"
                onChange={searchByStyle}
                type={type}
              />
              <Form.Check
                label="Expressionism"
                id="Expressionism"
                onChange={searchByStyle}
                type={type}
              />
              <Form.Check
                label="Impressionism"
                id="Impressionism"
                onChange={searchByStyle}
                type={type}
              />
              <Form.Check
                label="Landscape"
                id="Landscape"
                onChange={searchByStyle}
                type={type}
              />
              <Form.Check
                label="Oil"
                id="Oil"
                onChange={searchByStyle}
                type={type}
              />
              <Form.Check
                label="Pastel"
                id="Pastel"
                onChange={searchByStyle}
                type={type}
              />
              <Form.Check
                label="Pop Art"
                id="Pop Art"
                onChange={searchByStyle}
                type={type}
              />
              <Form.Check
                label="Portrait"
                id="Portrait"
                onChange={searchByStyle}
                type={type}
              />
              <Form.Check
                label="Spray Paint"
                id="Spray Paint"
                onChange={searchByStyle}
                type={type}
              />
              <Form.Check
                label="Still life"
                id="Still life"
                onChange={searchByStyle}
                type={type}
              />
              <Form.Check
                label="Surreal"
                id="Surreal"
                onChange={searchByStyle}
                type={type}
              />
              <Form.Check
                label="Watercolour"
                id="Watercolour"
                onChange={searchByStyle}
                type={type}
              />
            </div>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
};

export default FilteredDropdown;
