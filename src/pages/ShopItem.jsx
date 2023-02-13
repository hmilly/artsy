import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPaintings } from "../fns/fetchFns";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import PaintingCard from "../components/PaintingCard";

const ShopItem = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [paintingData, setPaintingData] = useState({});

  const updateSold = (id) => {
    console.log(id);
  };

  useEffect(() => {
    fetchPaintings(params.shopId)
      .then((paintingArr) => {
        const painting = paintingArr.find(
          (p) =>
            p.name.toLowerCase() === params.paintingName.split("-").join(" ")
        );
        setPaintingData(painting);
      })
      .then(() => setLoading(false))
      .catch(() => toast.error("Could not fetch paintings"));
  }, [params.shopId, params.paintingData]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="col">
      <div className="card flex-column-reverse">
        <PaintingCard painting={paintingData} lgImg={true} />
      </div>
    </main>
  );
};

export default ShopItem;
