import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
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

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <header>
        <h3>{seller?.name}</h3>
        <p>{seller?.userRef}</p>
      </header>
      <main className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3">
        {paintings.length === 0 ? (
          <p>No items in the shop yet!</p>
        ) : (
          paintings?.map((painting) => (
            <div key={painting?.id} className="col">
              <div className="card">
                <Link
                  to={`${painting.name.toLowerCase().split(" ").join("-")}`}
                >
                  <PaintingCard painting={painting} />
                </Link>
              </div>
            </div>
          ))
        )}
      </main>
    </>
  );
};

export default Shop;
