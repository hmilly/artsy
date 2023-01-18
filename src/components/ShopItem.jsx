const ShopItem = ({ paintingData }) => {
  const updateSold = (id) => {
    console.log(id)
  };

  return (
    <>
      <img src={paintingData.imgUrl} alt={paintingData.name} className="img-fluid img-thumbnail"/>
      <div>
        <h4>{paintingData.name}</h4>

        {paintingData.description && <p>{paintingData.description}</p>}

        <section>
          <p>Price {paintingData.price}</p>
          <button
            onClick={() => updateSold(paintingData)}
            className={paintingData.reserved ? "red" : "green"}
          >
            {paintingData.reserved ? "Reserved" : "Reserve"}
          </button>
        </section>
      </div>
    </>
  );
};

export default ShopItem;
