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
            key={i}
            className="bg-image my-2 h-25 rounded"
            style={{
              background: `url(${seller.paintings[0].imgUrl}) left 50% / cover no-repeat`,
            }}
          >
            <div className="h-100 w-100 d-flex flex-column align-items-center justify-content-between py-2 text-bg-dark bg-opacity-25">
              <h3>{seller.name}</h3>
              <p className="px-2 text-center d-none d-sm-block">
                {seller.about.slice(0, 140) + "..."}
              </p>
              <Link
                to={`shop/${seller.id}`}
                className="btn btn-primary border-dark fw-bolder"
              >
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
