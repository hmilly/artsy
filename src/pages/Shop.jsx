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
    <main className="container">
      <h3 className="mb-5">
        <span className="fw-bold"> Seller Name:</span> {seller?.name}
      </h3>
      <p>
        <span className="fw-bold"> About:</span> {seller.about}
      </p>
      <h3>Items for sale:</h3>
      <div className="row row-cols-1 row-cols-sm-2">
        {paintings.length === 0 ? (
          <p>No items in the shop yet!</p>
        ) : (
          paintings?.map((painting) => (
            <div key={painting?.id} className="col">
              <div className="card align-items-center">
                <Link
                  to={`${painting.name.toLowerCase().split(" ").join("-")}`}
                  className="card-body"
                >
                  <PaintingCard painting={painting} lgImg={false} />
                </Link>
                <button
                  onClick={() => updateSold(painting.id)}
                  className={`m-2 btn rounded-pill ${
                    painting?.reservedById !== "" ? "btn-danger" : "btn-success"
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
  );
};

export default Shop;
