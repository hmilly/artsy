import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDocs, doc, collection } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import ShopItem from "../components/ShopItem";

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
    <>
      <header className="d-flex  justify-content-between w-100">
        <h1 className="w-75 text-center">Artsy</h1>

        <nav className="w-25 m-auto">
          <ul className="d-flex justify-content-between m-0 list-unstyled">
            <li>
              <Link className="registerLink" to="sign-in">
                Sign in
              </Link>
            </li>
            <li>
              <Link className="registerLink" to="sign-up">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </header>

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
    </>
  );
};

export default Home;
