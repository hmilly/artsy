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
    const fetchData = async () => {
      const colRef = collection(db, "sellers");
      const docSnap = await getDocs(colRef);

      const storeArr = [];
      docSnap.forEach((doc) => storeArr.push(doc.data()));

      setSellersStore(storeArr);
      setLoading(false);
    };

    fetchData();
  }, []);

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
      <main className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 
      border-2 border-secondary">
        <ShopItem />
      </main>
    </>
  );
};

export default Home;
