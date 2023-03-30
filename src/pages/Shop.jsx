import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchPaintingsArr, fetchUserById } from "../fns/fetchFns";
import { Container, Col, Row, Accordion } from "react-bootstrap";
import LoadingState from "../components/LoadingState";
import PaintingCard from "../components/PaintingCard";
import Layout from "../components/Layout";

const Shop = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [paintings, setPaintings] = useState({});
  const [seller, setSeller] = useState({});

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
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch paintings");
      }
    };
    getUserData();
  }, [params.sellerId]);

  const updateSold = (id) => {
    console.log(id);
  };

  if (loading) {
    return <LoadingState />;
  }
  return (
    <Layout>
      <Container as="main" className="p-2">
        <h3 className="mb-5">
          <span className="fw-bold"> Seller: </span>
          {seller?.name.charAt(0).toUpperCase() + seller?.name.slice(1)}
        </h3>
        <Accordion defaultActiveKey="0" className="my-4">
          <Accordion.Item eventKey="0">
            <Accordion.Header> About:</Accordion.Header>
            <Accordion.Body>{seller.about}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <h3 className="mb-4">Items for sale:</h3>
        <Row className="row-cols-1 row-cols-sm-2 align-items-start">
          {paintings.length === 0 ? (
            <p>No items in the shop yet!</p>
          ) : (
            paintings?.map((painting) => (
              <Col key={painting?.id} className="mb-2">
                <div className="border border-secondary rounded">
                  <Link
                    className="h-100 link-dark text-decoration-none "
                    to={`${painting.name.toLowerCase().split(" ").join("-")}`}
                  >
                    <PaintingCard painting={painting} lgImg={false} />
                  </Link>
                </div>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </Layout>
  );
};

export default Shop;
