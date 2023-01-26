import { Link } from "react-router-dom";

const PaintingCard = ({ paintings }) => {
  // const updateSold = (id) => {
  //   console.log(id);
  // };

  
  return (
    <>
      {paintings?.map((paintingData) => (
        <Link to={`${paintingData.name.toLowerCase().split(" ").join("-")}`}>
          <div key={paintingData?.id} className="col">
            <div className="card">
              <img
                src={paintingData?.imgUrl}
                alt={paintingData?.name}
                className="img-fluid img-thumbnail"
              />
              <div className="card-body">
                <h4 className="card-title">{paintingData?.name}</h4>
                <section>
                  <p>Price {paintingData?.price}</p>
                  {/* <button
                    onClick={() => updateSold(paintingData)}
                    className={paintingData?.reserved ? "red" : "green"}
                  >
                    {paintingData?.reserved ? "Reserved" : "Reserve"}
                  </button> */}
                </section>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default PaintingCard;
