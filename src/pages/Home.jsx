import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import LoadingState from "../components/LoadingState";
import Layout from "../components/Layout";
import { fetchAllSellerData } from "../fns/fetchFns";
import { Container, Row, Col, Card } from "react-bootstrap";

const Home = () => {
  const [allSellersData, setAllSellersData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAllSellerData();
        setAllSellersData(data);
      } catch (e) {
        console.log(e);
        toast.error("Could not set user Data");
      }
      setLoading(false);
    };
    getData();
  }, []);

  const click = (e, seller) => {
    e.preventDefault();
    console.log(seller);
  };

  if (loading) {
    return <LoadingState />;
  }
  return (
    <Layout>
      <Container as="main">
        <Row as="section" className="row-cols-1">
          <Col as="h2" className="mb-4">
            Welcome to Artsy
          </Col>
          <Col as="p">
            Please take the time to look around at our registered sellers art
            pages below.
          </Col>
          <Col as="p">
            If there is anything you like the look of, please 'Reserve' the item
            and the seller will be in touch!
          </Col>
          <Col as="p">Head to the profile page to manage your saved items.</Col>
          <Col as="p">Enjoy!</Col>
        </Row>
        <Row className="py-2 row-cols-1 row-cols-lg-2 g-3">
          {allSellersData?.map((seller, i) => (
            <Col key={i}>
              <div
                className="rounded d-flex"
                style={{
                  background: `url(${seller.paintings[0].imgUrl}) center 50% / cover no-repeat`,
                  height: "230px",
                }}
              >
                <Card className="align-items-center justify-content-around py-2 text-bg-dark bg-opacity-25 w-100">
                  <Card.Title>
                    {seller?.name.charAt(0).toUpperCase() +
                      seller?.name.slice(1)}
                  </Card.Title>
                  <Card.Body className="text-center d-none d-sm-block">
                    {seller.about.slice(0, 230) + "..."}
                  </Card.Body>
                  <Link
                    to={`shop/${seller.id}`}
                    className="btn btn-primary border-dark fw-bolder"
                  >
                    Go to shop
                  </Link>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default Home;
