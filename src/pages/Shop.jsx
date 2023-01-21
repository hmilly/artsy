import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import ShopItem from "../components/ShopItem";

const Shop = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [paintings, setPaintings] = useState({});

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const paintingsRef = collection(db, "paintings");
        const q = query(paintingsRef, where("sellerId", "==", params.shopId));
        const querySnap = await getDocs(q);

        const paintings = [];

        querySnap.forEach((doc) => {
          return paintings.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setPaintings(paintings);
        console.log(paintings);

        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings");
        console.log(error);
      }
    };

    fetchPaintings();
  }, [params.shopId]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div>
        <h3>page name</h3>
        <p>page description</p>
      </div>
      <main
        className="container
    border border-1 border-secondary"
      >
        <ShopItem paintings={paintings} />
      </main>
    </>
  );
};

export default Shop;
