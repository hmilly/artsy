import { Col, Dropdown } from "react-bootstrap";

const FilterByPriceOrName = ({ paintings, setPaintings }) => {
  // eslint-disable-next-line no-unused-vars
  const allPaintings = [...paintings];

  const lowToHigh = () => {
    allPaintings.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    setPaintings(allPaintings);
  };

  const highToLow = () => {
    allPaintings.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    setPaintings(allPaintings);
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
  };

  return (
    <Col className="mb-3">
      <Dropdown>
        <Dropdown.Toggle
          variant="light"
          className="border rounded border-secondary border-opacity-50 w-100"
          id="dropdown-button"
        >
          Sort by
        </Dropdown.Toggle>
        <Dropdown.Menu variant="light" className="px-1 w-100">
          <Dropdown.Item onClick={lowToHigh}>
            Low to high
          </Dropdown.Item>
          <Dropdown.Item onClick={highToLow}>
            High to low
          </Dropdown.Item>
          <Dropdown.Item onClick={ascend}>
            Name ascending
          </Dropdown.Item>
          <Dropdown.Item onClick={descend}>
            Name descending
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
};

export default FilterByPriceOrName;
