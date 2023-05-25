/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import { Col, Form, Dropdown } from "react-bootstrap";

const FilteredDropdown = ({ paintings, setPaintings, setPageNo }) => {
  // eslint-disable-next-line no-unused-vars
  const [allPaintings] = useState(paintings);
  const [styles, setStyles] = useState([]);

  const updateStylesArray = (e) => {
    if (e.target.checked) {
      setStyles([...styles, e.target.id.toLowerCase()]);
    } else {
      const arr = [...styles];
      arr.splice(arr.indexOf(e.target.id.toLowerCase()), 1);
      setStyles(arr);
    }
  };

  useEffect(() => {
    const updatePics = () => {
      if (styles.length === 0) {
        setPaintings(allPaintings);
      } else {
        let arr = [];
        styles.forEach((s) => {
          allPaintings.map((p) => {
            if (p.description.toLowerCase().includes(s)) arr.push(p);
          });
        });
        setPaintings(arr);
      }
      setPageNo(1);
    };
    updatePics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [styles, allPaintings]);

  return (
    <Col className="mb-3">
      <Dropdown>
        <Dropdown.Toggle
          variant="light"
          className={`border rounded border-secondary border-opacity-50 w-100 ${
            styles.length > 0 && "bg-secondary bg-opacity-50"
          }`}
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
                onClick={updateStylesArray}
                type={type}
              />
              <Form.Check
                label="Acrylic"
                id="Acrylic"
                onClick={updateStylesArray}
                type={type}
              />
              <Form.Check
                label="Colourful"
                id="Colourful"
                onClick={updateStylesArray}
                type={type}
              />
              <Form.Check
                label="Digital"
                id="Digital"
                onClick={updateStylesArray}
                type={type}
              />
              <Form.Check
                label="Expressionism"
                id="Expressionism"
                onClick={updateStylesArray}
                type={type}
              />
              <Form.Check
                label="Impressionism"
                id="Impressionism"
                onClick={updateStylesArray}
                type={type}
              />
              <Form.Check
                label="Landscape"
                id="Landscape"
                onClick={updateStylesArray}
                type={type}
              />
              <Form.Check
                label="Oil"
                id="Oil"
                onClick={updateStylesArray}
                type={type}
              />
              <Form.Check
                label="Pastel"
                id="Pastel"
                onClick={updateStylesArray}
                type={type}
              />
              <Form.Check
                label="Pop Art"
                id="Pop Art"
                onClick={updateStylesArray}
                type={type}
              />
              <Form.Check
                label="Portrait"
                id="Portrait"
                onClick={updateStylesArray}
                type={type}
              />
              <Form.Check
                label="Spray Paint"
                id="Spray Paint"
                onClick={updateStylesArray}
                type={type}
              />
              <Form.Check
                label="Still life"
                id="Still life"
                onClick={updateStylesArray}
                type={type}
              />
              <Form.Check
                label="Surreal"
                id="Surreal"
                onClick={updateStylesArray}
                type={type}
              />
              <Form.Check
                label="Watercolour"
                id="Watercolour"
                onClick={updateStylesArray}
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
