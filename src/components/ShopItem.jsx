import { useState, useEffect } from "react";
import { getDocs, doc, collection } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";

const ShopItem = ({ paintingData }) => {
  const updateSold = (id) => {
    console.log(id);
  };

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
    <>
      {paintings.map((paintingData) => (
        <div className="col">
          <div className="card">
            <img
              src={paintingData.imgUrl}
              alt={paintingData.name}
              className="img-fluid img-thumbnail"
            />
            <div className="card-body">
              <h4 className="card-title">{paintingData.name}</h4>

              {paintingData.description && (
                <p className="card-text">{paintingData.description}</p>
              )}

              <section>
                <p>Price {paintingData.price}</p>
                <button
                  onClick={() => updateSold(paintingData)}
                  className={paintingData.reserved ? "red" : "green"}
                >
                  {paintingData.reserved ? "Reserved" : "Reserve"}
                </button>
              </section>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShopItem;
