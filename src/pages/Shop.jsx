import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchPaintingsArr, fetchUserById } from "../fns/fetchFns";
import Spinner from "../components/Spinner";
import PaintingCard from "../components/PaintingCard";
import Layout from "../components/Layout";

const Shop = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [paintings, setPaintings] = useState({});
  const [seller, setSeller] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const seller = await fetchUserById(params.sellerId);
        setSeller(seller);
      } catch (error) {
        toast.error("Could not fetch User");
      }

      try {
        const paintings = await fetchPaintingsArr("sellerId", params.sellerId);
        setPaintings(paintings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch paintings");
      }
    };
    getUserData();
  }, [params.sellerId]);

  const updateSold = (id) => {
    console.log(id);
  };


  if (loading) {
    return <Spinner />;
  }
  return (
    <Layout>
      <main className="container p-2">
        <h3 className="mb-5">
          <span className="fw-bold"> Seller Name:</span> {seller?.name}
        </h3>
        <p>
          <span className="fw-bold"> About:</span> {seller.about}
        </p>
        <h3 className="mb-4">Items for sale:</h3>
        <div className="row row-cols-1 row-cols-sm-2 align-items-start">
          {paintings.length === 0 ? (
            <p>No items in the shop yet!</p>
          ) : (
            paintings?.map((painting) => (
              <div key={painting?.id} className="col">
                <div className="card">

                  <Link
                    className="h-100 link-dark text-decoration-none "
                    to={`${painting.name.toLowerCase().split(" ").join("-")}`}
                  >
                    <PaintingCard painting={painting} lgImg={false} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Shop;
