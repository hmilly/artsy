import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingState from "../components/LoadingState";
import Layout from "../components/Layout";
import { fetchAllSellerData, fetchPaintingsCollection } from "../fns/fetchFns";
import { Container, Row, Col } from "react-bootstrap";
import SellersCard from "../components/SellersCard";
import PaintingCard from "../components/PaintingCard";
import FilteredSearch from "../components/FilteredSearch";
import FilteredRangeSlider from "../components/FilteredRangeSlider";
import FilteredDropdown from "../components/FilteredDropdown";
import WhatIsArtsyCard from "../components/WhatIsArtsyCard";

const Home = () => {
  const [allSellersData, setAllSellersData] = useState(null);
  const [randomSeller, setRandomSeller] = useState(null);
  const [paintings, setPaintings] = useState(null);
  const [loading, setLoading] = useState(true);

  const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAllSellerData();
        setAllSellersData(data);

        randomNumber(0, data.length);
        setRandomSeller(data[randomNumber(0, data.length)]);
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
      <Container as="main">
        {/* page intro */}
        <Row as="section" className="row-cols-1 mx-sm-5 text-center">
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

        {/* 1 Randomly highlighted artist */}
        <Row className="my-5 justify-content-center border rounded">
          <h2>Featured Artist</h2>
          <Row className="py-2">
            <Col>
              {randomSeller && (
                <SellersCard
                  seller={randomSeller}
                  about={randomSeller.about}
                  height="450px"
                />
              )}
            </Col>
          </Row>
        </Row>

        {/* Sellers banner */}
        <Row className="bg-secondary bg-opacity-25 py-5">
          <h2>Sellers</h2>
          <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3 justify-content-evenly">
            {allSellersData?.slice(0, 3).map((seller, i) => (
              <Col key={seller.id}>
                <SellersCard seller={seller} />
              </Col>
            ))}
          </Row>
        </Row>

        {/* Paintings available */}
        <Row className="py-5">
          <h2>Paintings</h2>
          <Row
            as="form"
            className="p-2 row-cols-1 row-cols-md-3 align-items-center justify-content-center"
          >
            <FilteredSearch setPaintings={setPaintings} paintings={paintings} />
            <FilteredRangeSlider
              setPaintings={setPaintings}
              paintings={paintings}
            />
            <FilteredDropdown
              setPaintings={setPaintings}
              paintings={paintings}
            />
          </Row>
          <Row className="py-2 row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {paintings?.slice(0, 6).map((painting) => (
              <Col key={painting.id} className="mb-2">
                <div className="border border-secondary border-1 rounded h-100">
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
        </Row>

        <WhatIsArtsyCard />
      </Container>
    </Layout>
  );
};

export default Home;
