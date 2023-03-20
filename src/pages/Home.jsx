import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Layout from "../components/Layout";
import { fetchAllSellerData } from "../fns/fetchFns";

const Home = () => {
  const [allSellersData, setAllSellersData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAllSellerData();
        setAllSellersData(data);
      } catch (e) {
        console.log(e);
        toast.error("Could not set user Data");
      }
      setLoading(false);
    };
    getData();
  }, []);

  const click = (e, seller) => {
    e.preventDefault();
    console.log(seller);
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <Layout>
      <main className="container">
        <div className="py-2 row row-cols-1 row-cols-lg-2 g-3">
          {allSellersData?.map((seller, i) => (
            <div key={i}>
              <div
                className="rounded"
                style={{
                  background: `url(${seller.paintings[0].imgUrl}) left 50% / cover no-repeat`,
                }}
              >
                <div className="card align-items-center py-2 text-bg-dark bg-opacity-25">
                  <h3 className="card-title">{seller.name}</h3>
                  <p className="card-body text-center d-none d-sm-block">
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
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Home;
