import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const SellersCard = ({ seller }) => {
  return (
    <div
      className="rounded d-flex"
      style={{
        background: `url(${seller?.paintings[0]?.imgUrl}) center 50% / cover no-repeat`,
        height: "450px",
      }}
    >
      <Card className="align-items-center justify-content-around py-2 text-bg-dark bg-opacity-50 w-100">
        <div className="d-flex flex-column justify-content-around align-items-center gap-2">
          <Card.Title>
            {seller?.name.charAt(0).toUpperCase() + seller?.name.slice(1)}
          </Card.Title>
          <Link
            to={`shop/${seller.id}`}
            className="btn btn-primary border-dark fw-bolder"
          >
            Go to shop
          </Link>
        </div>
        <div className="text-center d-none d-md-block w-75">
          <p>{seller?.about}</p>
        </div>
      </Card>
    </div>
  );
};

export default SellersCard;
