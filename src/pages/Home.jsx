import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Row, Col, Carousel } from "react-bootstrap";
import { fetchAllSellerData, fetchPaintingsCollection } from "../fns/fetchFns";
import LoadingState from "../components/LoadingState";
import Layout from "../components/Layout";
import SellersCard from "../components/SellersCard";
import FilteredSearch from "../components/FilteredSearch";
import FilterByPriceOrName from "../components/FilterByPriceOrName";
import FilteredDropdown from "../components/FilteredDropdown";
import PaintingCard from "../components/PaintingCard";
import Paginate from "../components/Paginate";
import WhatIsArtsyCard from "../components/WhatIsArtsyCard";

const Home = () => {
  const [allSellersData, setAllSellersData] = useState(null);
  const [paintings, setPaintings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [noToDisplay] = useState(6);

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
      {/* page intro */}
      <Row as="section" className="row-cols-1 mx-sm-5 text-center">
        <Col as="h2" className="my-4">
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
      {/* All artists slideshow - pause on hover */}
      <Row as="section" className="my-5">
        <h2>Sellers</h2>
        <Carousel pause="hover" interval="20000">
          {allSellersData?.map((seller) => (
            <Carousel.Item key={seller.id}>
              <SellersCard seller={seller} />
            </Carousel.Item>
          ))}
        </Carousel>
      </Row>
      {/* Paintings available */}
      <Row as="section" className="my-5">
        <h2>Paintings</h2>
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
                <div className="border border-secondary border-1 rounded h-100">
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
      </Row>
      <WhatIsArtsyCard />
    </Layout>
  );
};

export default Home;
