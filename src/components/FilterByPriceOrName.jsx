import { useState } from "react";
import { Col, Dropdown } from "react-bootstrap";

const FilterByPriceOrName = ({ paintings, setPaintings, setPageNo }) => {
  // eslint-disable-next-line no-unused-vars
  const [initialPaintingArr] = useState(paintings);
  const allPaintings = [...paintings];
  const [filter, setFilter] = useState("Sort by");

  const clear = () => {
    setPaintings(initialPaintingArr);
    setPageNo(1);
    setFilter("Sort by");
  };

  const lowToHigh = () => {
    allPaintings.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    setPaintings(allPaintings);
    setPageNo(1);
    setFilter("Low to high");
  };

  const highToLow = () => {
    allPaintings.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    setPaintings(allPaintings);
    setPageNo(1);
    setFilter("High to low");
  };

  const ascend = () => {
    allPaintings.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setPaintings(allPaintings);
    setPageNo(1);
    setFilter("Ascending");
  };

  const descend = () => {
    allPaintings.sort((a, b) => {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
    setPaintings(allPaintings);
    setPageNo(1);
    setFilter("Descending");
  };

  return (
    <Col className="mb-3">
      <Dropdown>
        <Dropdown.Toggle
          variant="light"
          className={`border rounded border-secondary border-opacity-50 w-100 ${
            filter !== "Sort by" && "bg-secondary bg-opacity-50"
          }`}
          id="dropdown-button"
        >
          {filter}
        </Dropdown.Toggle>
        <Dropdown.Menu variant="light" className="px-1 w-100">
          <Dropdown.Item onClick={clear}>Recommended</Dropdown.Item>
          <Dropdown.Item onClick={lowToHigh}>Low to high</Dropdown.Item>
          <Dropdown.Item onClick={highToLow}>High to low</Dropdown.Item>
          <Dropdown.Item onClick={ascend}>Name ascending</Dropdown.Item>
          <Dropdown.Item onClick={descend}>Name descending</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
};

export default FilterByPriceOrName;
