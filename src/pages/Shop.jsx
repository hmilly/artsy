import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchPaintingsArr, fetchUserById } from "../fns/fetchFns";
import LoadingState from "../components/LoadingState";
import Layout from "../components/Layout";
import FilteredSearch from "../components/FilteredSearch";
import FilterByPriceOrName from "../components/FilterByPriceOrName";
import FilteredDropdown from "../components/FilteredDropdown";
import PaintingCard from "../components/PaintingCard";
import Paginate from "../components/Paginate";

const Shop = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [paintings, setPaintings] = useState({});
  const [paintingsCount, setPaintingsCount] = useState(0);
  const [seller, setSeller] = useState({});
  const [pageNo, setPageNo] = useState(1);
  const [noToDisplay] = useState(4);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const seller = await fetchUserById(params.sellerId);
        setSeller(seller);
      } catch (error) {
        toast.error("Could not fetch User");
      }

      try {
        const paintings = await fetchPaintingsArr("sellerId", params.sellerId);
        setPaintings(paintings);
        setPaintingsCount(paintings.length);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch paintings");
      }
    };
    getUserData();
  }, [params.sellerId]);

  if (loading) {
    return <LoadingState />;
  }
  return (
    <Layout>
      <h3 className="mb-5">
        <span className="fw-bold"> Seller: </span>
        {seller?.name.charAt(0).toUpperCase() + seller?.name.slice(1)}
      </h3>
      <Row className="my-5 bg-success bg-opacity-25 border rounded">
        <h3 className="bg-success bg-opacity-50 py-3 text-decoration-underline text-center">
          About the artist
        </h3>
        <p>{seller.about}</p>
      </Row>
      <h3 className="mb-4">Items for sale:</h3>
      {paintingsCount === 0 ? (
        <p className="text-center py-5">No items in the shop yet!</p>
      ) : (
        <>
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
          <Row className="py-2 row-cols-1 row-cols-lg-2 g-3">
            {paintings
              ?.slice(pageNo * noToDisplay - noToDisplay, pageNo * noToDisplay)
              .map((painting) => (
                <Col key={painting?.id} className="mb-2">
                  <div className="border border-secondary rounded h-100">
                    <Link
                      className="h-100 link-dark text-decoration-none "
                      to={`${painting.name.toLowerCase().split(" ").join("-")}`}
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
        </>
      )}
    </Layout>
  );
};

export default Shop;
