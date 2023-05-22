import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchPaintingsArr, fetchUserById } from "../fns/fetchFns";
import { Col, Row } from "react-bootstrap";
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
      <Row className="py-2 row-cols-1 row-cols-lg-2 g-3">
        {paintings.length === 0 ? (
          <p>No items in the shop yet!</p>
        ) : (
          paintings?.map((painting) => (
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
          ))
        )}
      </Row>
    </Layout>
  );
};

export default Shop;
