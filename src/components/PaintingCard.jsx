const PaintingCard = ({ painting, lgImg }) => {
  return (
    <>
      <img
        src={painting?.imgUrl}
        alt={painting?.name}
        className="img-fluid img-thumbnail border-0"
        style={{
          width: !lgImg && "400px",
          height: !lgImg && "300px",
          objectFit: !lgImg && "scale-down",
        }}
      />

      <div className="d-flex flex-column align-items-center">
        <h4 className="card-title">{painting?.name}</h4>
        <section>
          <p>Price {painting?.price}</p>
        </section>
      </div>
    </>
  );
};

export default PaintingCard;
