import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { fetchAllSellerData } from "../fns/fetchFns";
import { toast } from "react-toastify";

const Home = () => {
  const [allSellersData, setAllSellersData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllSellerData()
      .then((data) => setAllSellersData(data))
      .then(() => setLoading(false))
      .catch((e) => {
        console.log(e);
        toast.error("Could not set user Data");
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
    <main className="container-fluid">
      <div className="row vh-100 row-cols-1">
        {allSellersData?.map((seller, i) => (
          <div
            className="bg-image my-2 h-25 border rounded"
            style={{ backgroundImage: `url(${seller.paintings[0].imgUrl})` }}
          >
            <div className="h-100 d-flex flex-column justify-content-around align-items-center">
              <h3 className="bg-light">{seller.name}</h3>
              <p className="bg-light">{seller.about}</p>
              <Link key={i} to={`shop/${seller.id}`}>
                Go to shop
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
