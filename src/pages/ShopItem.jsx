import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPaintingsArr } from "../fns/fetchFns";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import LoadingState from "../components/LoadingState";
import PaintingCard from "../components/PaintingCard";
import Layout from "../components/Layout";

const ShopItem = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [paintingData, setPaintingData] = useState({});

  const updateSold = (id) => {
    console.log(id);
  };

  useEffect(() => {
    const getPaintings = async () => {
      try {
        const paintingsArr = await fetchPaintingsArr(
          "sellerId",
          params.sellerId
        );
        const painting = paintingsArr.find(
          (p) =>
            p.name.toLowerCase() === params.paintingName.split("-").join(" ")
        );
        setPaintingData(painting);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch paintings");
      }
    };
    getPaintings();
  }, [params.sellerId, params.paintingData]);

  if (loading) {
    return <LoadingState />;
  }
  return (
    <Layout>
      <Container as="main" className="container p-1">
        <div>
          <PaintingCard painting={paintingData} ShopItem={true} />
        </div>
      </Container>
    </Layout>
  );
};

export default ShopItem;
