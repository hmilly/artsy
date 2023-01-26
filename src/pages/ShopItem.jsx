import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPaintings } from "../fns/fetchFns";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

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
    <main className="">
      <div key={paintingData?.id} className="col">
        <div className="card">
          <img
            src={paintingData?.imgUrl}
            alt={paintingData?.name}
            className="img-fluid"
          />
          <div className="card-body">
            <h4 className="card-title">{paintingData?.name}</h4>

            {paintingData?.description && (
              <p className="card-text">{paintingData?.description}</p>
            )}

            <section>
              <p>Price {paintingData?.price}</p>
              <button
                onClick={() => updateSold(paintingData)}
                className={paintingData?.reserved ? "red" : "green"}
              >
                {paintingData?.reserved ? "Reserved" : "Reserve"}
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShopItem;
