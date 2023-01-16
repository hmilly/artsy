import { useState, useEffect } from "react";
import { getDocs, doc, collection } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import ShopItem from "./ShopItem";

const Collection = () => {
  const [paintings, setPaintings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, "paintings");
      const docSnap = await getDocs(colRef);

      const paintingsArr = [];
      docSnap.forEach((doc) => paintingsArr.push(doc.data()));

      setPaintings(paintingsArr);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      {paintings.map((paintingData) => (
        <ShopItem paintingData={paintingData} />
      ))}
    </main>
  );
};

export default Collection;
