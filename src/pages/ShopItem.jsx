import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPaintingsArr } from "../fns/fetchFns";
import { toast } from "react-toastify";
import LoadingState from "../components/LoadingState";
import PaintingCard from "../components/PaintingCard";
import Layout from "../components/Layout";

const ShopItem = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [paintingData, setPaintingData] = useState({});

  // eslint-disable-next-line no-unused-vars
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.sellerId, params.paintingData]);

  if (loading) {
    return <LoadingState />;
  }
  return (
    <Layout>
      <div>
        <PaintingCard painting={paintingData} ShopItem={true} />
      </div>
    </Layout>
  );
};

export default ShopItem;
