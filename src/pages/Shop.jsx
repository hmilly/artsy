import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import PaintingCard from "../components/PaintingCard";
import { fetchPaintings, fetchUser } from "../fns/fetchFns";

const Shop = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [paintings, setPaintings] = useState({});
  const [seller, setSeller] = useState({});

  useEffect(() => {
    fetchUser(params.sellerId)
      .then((s) => setSeller(s))
      .catch(() => toast.error("Could not fetch User"));
    fetchPaintings(params.sellerId)
      .then((p) => setPaintings(p))
      .then(() => setLoading(false))
      .catch(() => toast.error("Could not fetch paintings"));
  }, [params.sellerId]);

  const updateSold = (id) => {
    console.log(id);
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <header className="p-2">
        <h3 className="mb-5">
          Seller Name:{" "}
          <span className="text-decoration-underline">{seller?.name}</span>
        </h3>
      </header>
      <main className="container">
        <div>
          <p>About: {seller.about}</p>
        </div>

        <div className="row">
          <h3>Items for sale:</h3>
          {paintings.length === 0 ? (
            <p>No items in the shop yet!</p>
          ) : (
            paintings?.map((painting) => (
              <div key={painting?.id} className="col">
                <div className="card">
                  <Link
                    to={`${painting.name.toLowerCase().split(" ").join("-")}`}
                  >
                    <PaintingCard painting={painting} lgImg={false} />
                  </Link>
                  <button
                    onClick={() => updateSold(painting.id)}
                    className={`m-2 btn rounded-pill ${
                      painting?.reservedById !== ""
                        ? "btn-success"
                        : "btn-danger"
                    }`}
                  >
                    {painting?.reservedById ? "Reserved" : "Reserve"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
};

export default Shop;
