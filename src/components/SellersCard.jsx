import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

const SellersCard = ({ seller }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [bgImg, setBgImg] = useState(process.env.PUBLIC_URL + "/WIP.png");

  useEffect(() => {
    const handleWindowResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  useEffect(() => {
    const randomImg = (arr) => {
      if (arr.length !== 0)
        setBgImg(arr[Math.floor(Math.random() * arr.length)].imgUrl);
    };
    randomImg(seller?.paintings);
  }, [seller]);

  return (
    <div
      className="rounded d-flex "
      style={{
        background: `url(${bgImg}) center 50% / cover no-repeat`,
        height: windowSize >= 768 ? "650px" : "350px",
      }}
    >
      <Card className="align-items-center justify-content-around py-2 text-bg-dark bg-opacity-25 w-100">
        <div className="d-flex flex-column justify-content-around align-items-center gap-2">
          <Card.Title>
            {seller?.name.charAt(0).toUpperCase() + seller?.name.slice(1)}
          </Card.Title>
          <Link
            to={`/shop/${seller.id}`}
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
