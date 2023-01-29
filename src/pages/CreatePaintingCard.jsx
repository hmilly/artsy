import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";

const CreatePaintingCard = () => {
  const params = useParams();
  const [paintingData, setPaintingData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPainting = async () => {
      const paintingsRef = doc(db, "paintings", params.paintingId);
      const paintingSnap = await getDoc(paintingsRef);

      setPaintingData(paintingSnap.data());
      setLoading(false);
    };
    fetchPainting();
  }, [params.paintingId]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <img
        src={paintingData?.imgUrl}
        alt={paintingData?.name}
        className="img-fluid img-thumbnail "
      />

      <div className="card-body">
        <h4 className="card-title">{paintingData?.name}</h4>
        <section>
          <p>Price {paintingData?.price}</p>
        </section>
      </div>
    </>
  );
};

export default CreatePaintingCard;
