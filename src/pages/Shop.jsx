import ShopItem from "../components/ShopItem";
import { useParams } from "react-router-dom";

const Shop = () => {
  const params = useParams();

  return (
    <>
      <div>
        <h3>page name</h3>
        <p>page description</p>
      </div>
      <main
        className="container
    border border-1 border-secondary"
      >
        <ShopItem />
      </main>
    </>
  );
};

export default Shop;
