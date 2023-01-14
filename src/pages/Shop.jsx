import Collection from "../components/Collection";
import { useParams } from "react-router-dom";

const Shop = () => {
  const params = useParams();



  return (
    <>
      <div className="p-4">
        <h3>page name</h3>
        <p>page description</p>
      </div>

      <Collection />
    </>
  );
};

export default Shop;
