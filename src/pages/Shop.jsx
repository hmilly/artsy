import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import PaintingCard from "../components/PaintingCard";
import { fetchPaintings } from "../fns/fetchFns";

const Shop = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [paintings, setPaintings] = useState({});
  const [seller, setSeller] = useState({});

  useEffect(() => {
    fetchPaintings(params.shopId)
      .then((p) => setPaintings(p))
      .then(() => setLoading(false))
      .catch(() => toast.error("Could not fetch paintings"));
  }, [params.shopId]);

  // get user info
  useEffect(() => {
    const fetchUser = async () => {
      const sellerRef = doc(db, "sellers", params.shopId);
      const sellerSnap = await getDoc(sellerRef);
      setSeller({ ...sellerSnap.data(), id: params.shopId });
    };
    fetchUser();
  }, [params.shopId]);

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
          <p>About: {seller.description}</p>
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
