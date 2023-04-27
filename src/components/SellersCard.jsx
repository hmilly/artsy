import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const SellersCard = ({ seller, about = "", height = "230px" }) => {
  return (
    <div
      className="rounded d-flex"
      style={{
        background: `url(${seller.paintings[0].imgUrl}) center 50% / cover no-repeat`,
        height: height,
      }}
    >
      <Card className="align-items-center justify-content-around py-2 text-bg-dark bg-opacity-25 w-100">
        <Card.Title>
          {seller?.name.charAt(0).toUpperCase() + seller?.name.slice(1)}
        </Card.Title>
        <div className="text-center d-none d-sm-block w-75">
          <p>{about}</p>
        </div>
        <Link
          to={`shop/${seller.id}`}
          className="btn btn-primary border-dark fw-bolder"
        >
          Go to shop
        </Link>
      </Card>
    </div>
  );
};

export default SellersCard;
