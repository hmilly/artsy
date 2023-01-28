import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDocs, doc, collection } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";

const Home = () => {
  const [sellersStore, setSellersStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllSellers = async () => {
      const colRef = collection(db, "sellers");
      const docSnap = await getDocs(colRef);

      const storeArr = [];
      docSnap.forEach((doc) => storeArr.push({ ...doc.data(), id: doc.id }));

      setSellersStore(storeArr);
      setLoading(false);
    };

    fetchAllSellers();
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
      {sellersStore.map((seller, i) => (
        <Link
          key={i}
          to={`shop/${seller.id}`}
          className="card d-flex align-items-center justify-content-center m-2
                border rounded-circle"
          style={{ height: "100px", width: "100px" }}
        >
          <h3 className="card-text">{seller.name}</h3>
        </Link>
      ))}
    </main>
  );
};

export default Home;
