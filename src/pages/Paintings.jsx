import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchPaintingsCollection } from "../fns/fetchFns";
import LoadingState from "../components/LoadingState";
import Layout from "../components/Layout";
import FilteredSearch from "../components/FilteredSearch";
import FilterByPriceOrName from "../components/FilterByPriceOrName";
import FilteredDropdown from "../components/FilteredDropdown";
import PaintingCard from "../components/PaintingCard";
import Paginate from "../components/Paginate";

const Paintings = () => {
  const [paintings, setPaintings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [noToDisplay] = useState(6);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchPaintingsCollection();
        setPaintings(data);
      } catch (e) {
        console.log(e);
        toast.error("Could not fetch paintings");
      }
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return <LoadingState />;
  }
  return (
    <Layout>
      <Row as="section" className="row-cols-1">
        <Col as="h2" className="mb-4">
          Paintings
        </Col>
        <Col as="p">
          Please take the time to look around at our listed paintings below
        </Col>
        <Col as="p">
          Remember to reserve anything you like the look of by clicking the
          item, then head to your profile page to manage your saved items.
        </Col>
      </Row>
      <Row
        as="form"
        className="p-2 row-cols-1 row-cols-md-3 align-items-center justify-content-center"
      >
        <FilteredSearch
          setArr={setPaintings}
          arr={paintings}
          setPageNo={setPageNo}
        />
        <FilterByPriceOrName
          setPaintings={setPaintings}
          paintings={paintings}
          setPageNo={setPageNo}
        />
        <FilteredDropdown
          setPaintings={setPaintings}
          paintings={paintings}
          setPageNo={setPageNo}
        />
      </Row>
      <Row className="py-2 row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {paintings
          .slice(pageNo * noToDisplay - noToDisplay, pageNo * noToDisplay)
          .map((painting) => (
            <Col key={painting?.id} className="mb-2">
              <div className="border border-secondary rounded h-100">
                <Link
                  className="h-100 link-dark text-decoration-none "
                  to={`/shop/${painting?.sellerId}/${painting.name
                    .toLowerCase()
                    .split(" ")
                    .join("-")}`}
                >
                  <PaintingCard painting={painting} lgImg={false} />
                </Link>
              </div>
            </Col>
          ))}
      </Row>
      <Row as="section" className="p-3">
        <Paginate
          arrLength={paintings.length}
          pageNo={pageNo}
          setPageNo={setPageNo}
          noToDisplay={noToDisplay}
        />
      </Row>
    </Layout>
  );
};

export default Paintings;
