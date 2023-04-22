import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import LoadingState from "../components/LoadingState";
import Layout from "../components/Layout";
import { fetchPaintingsCollection } from "../fns/fetchFns";
import { Container, Row, Col } from "react-bootstrap";
import PaintingCard from "../components/PaintingCard";

const Paintings = () => {
  const [allPaintings, setAllPaintings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchPaintingsCollection();
        setAllPaintings(data);
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
            Welcome to Artsy
          </Col>
          <Col as="p">
            Please take the time to look around at our registered sellers art
            below.
          </Col>
          <Col as="p">
            If there is anything you like the look of, please inspect the
            painting page, 'Reserve' the item and the seller will be in touch!
          </Col>
          <Col as="p">
            Head to your profile page to manage your saved items.
          </Col>
          <Col as="p">Enjoy!</Col>
        </Row>
        <Row className="py-2 row-cols-1 row-cols-lg-2 g-3">
          {allPaintings?.map((painting) => (
            <Col key={painting?.id} className="mb-2">
              <div className="border border-secondary rounded">
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
