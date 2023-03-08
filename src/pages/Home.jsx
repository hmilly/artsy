import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDocs, doc, collection } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import { fetchAllSellerData } from "../fns/fetchFns";
import { toast } from "react-toastify";

const Home = () => {
  const [allSellers, setAllSellers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllSellerData()
      .then((data) => setAllSellers(data))
      .then(() => setLoading(false))
      .catch((e) => {
        toast.error("Could not fetch sellers");
        console.log(e);
      });
  }, []);

  const click = (e, seller) => {
    e.preventDefault();
    console.log(seller);
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="row row-cols-3 align-content-around justify-content-around">
      {allSellers.map((seller, i) => (
        <Link
          key={i}
          to={`shop/${seller.id}`}
          className="card d-flex align-items-center justify-content-center m-2
                border rounded-circle"
        >
          <h3 className="card-text">{seller.name}</h3>
          {seller.paintings.map((painting) => (
            <img src={`${painting.imgUrl}`}></img>
          ))}
        </Link>
      ))}
    </main>
  );
};

export default Home;
