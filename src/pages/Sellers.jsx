import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Row, Col } from "react-bootstrap";
import { fetchAllSellerData } from "../fns/fetchFns";
import LoadingState from "../components/LoadingState";
import Layout from "../components/Layout";
import FilteredSearch from "../components/FilteredSearch";
import SellersCard from "../components/SellersCard";
import Paginate from "../components/Paginate";

const Sellers = () => {
  const [sellers, setSellers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [noToDisplay] = useState(4);

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
        <FilteredSearch
          setArr={setSellers}
          arr={sellers}
          setPageNo={setPageNo}
        />
      </Row>
      <Row as="section" className="py-2 row-cols-1 row-cols-xl-2 g-4">
        {sellers
          ?.slice(pageNo * noToDisplay - noToDisplay, pageNo * noToDisplay)
          .map((seller) => (
            <Col key={seller.id}>
              <SellersCard seller={seller} />
            </Col>
          ))}
      </Row>
      <Row as="section" className="p-3">
        <Paginate
          arrLength={sellers.length}
          pageNo={pageNo}
          setPageNo={setPageNo}
          noToDisplay={noToDisplay}
        />
      </Row>
    </Layout>
  );
};

export default Sellers;
