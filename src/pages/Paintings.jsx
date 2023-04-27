import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import LoadingState from "../components/LoadingState";
import Layout from "../components/Layout";
import { fetchPaintingsCollection } from "../fns/fetchFns";
import { Container, Row, Col } from "react-bootstrap";
import PaintingCard from "../components/PaintingCard";
import PaintingsPgFilters from "../components/PaintingsPgFilters";

const Paintings = () => {
  const [paintings, setPaintings] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <Container as="main">
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
          <PaintingsPgFilters
            setPaintings={setPaintings}
            paintings={paintings}
          />
        </Row>
        <Row className="py-2 row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {paintings?.map((painting) => (
            <Col key={painting?.id} className="mb-2">
              <div className="border border-secondary rounded h-100">
                <Link
                  className="h-100 link-dark text-decoration-none "
                  to={`/shop/${painting.sellerId}/${painting.name
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
      </Container>
    </Layout>
  );
};

export default Paintings;
