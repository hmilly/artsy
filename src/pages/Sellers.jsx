import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { fetchAllSellerData } from "../fns/fetchFns";
import LoadingState from "../components/LoadingState";
import Layout from "../components/Layout";
import SellersCard from "../components/SellersCard";
import FilteredSearch from "../components/FilteredSearch";

const Sellers = () => {
  const [sellers, setSellers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAllSellerData();
        setSellers(data);
      } catch (e) {
        console.log(e);
        toast.error("Could not fetch sellers");
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
          Sellers
        </Col>
        <Col as="p">
          Please take the time to look around at our listed sellers below
        </Col>
      </Row>

      <Row
        as="form"
        className="p-2 row-cols-1 row-cols-md-3 align-items-center justify-content-center"
      >
        <FilteredSearch setArr={setSellers} arr={sellers} />
      </Row>

      <Row className="py-2 row-cols-1 row-cols-xl-2 g-4">
        {sellers?.map((seller) => (
          <Col>
            <SellersCard seller={seller} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default Sellers;
