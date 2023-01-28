import { Spinner } from "react-bootstrap";

const PaintingCard = ({ painting }) => {
  const updateSold = (id) => {
    console.log(id);
  };

  return (
    <>
      <img
        src={painting?.imgUrl}
        alt={painting?.name}
        className="img-fluid img-thumbnail "
      />

      <div className="card-body">
        <h4 className="card-title">{painting?.name}</h4>
        <section>
          <p>Price {painting?.price}</p>
          <button
            onClick={() => updateSold(painting)}
            className={painting?.reserved ? "red" : "green"}
          >
            {painting?.reserved ? "Reserved" : "Reserve"}
          </button>
        </section>
      </div>
    </>
  );
};

export default PaintingCard;
