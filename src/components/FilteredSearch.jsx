import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Col, Form } from "react-bootstrap";

const FilteredSearch = ({ arr, setArr }) => {
  const [arrCopy] = useState(arr);

  const searchByName = (e) => {
    const match = arrCopy.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setArr(match);
  };

  const searchByPrice = (e) => {};
  searchByPrice();

  return (
    <Col className="mb-3">
      <Form.Group className="bg-light border rounded border-secondary border-opacity-50 p-1 pe-1 ps-2 gap-1 d-flex">
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
  );
};

export default FilteredSearch;
