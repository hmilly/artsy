const ShopItem = ({ paintingData }) => {
  const updateSold = (id) => {};

  return (
    <>
      <img src={paintingData.imgUrl} alt={paintingData.name} className="w-25" />
      <div>
        <h4>{paintingData.name}</h4>

        {paintingData.description && <p>{paintingData.description}</p>}

        <section>
          <p>Price {paintingData.price}</p>
          <button
            onClick={() => updateSold(paintingData.id)}
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
