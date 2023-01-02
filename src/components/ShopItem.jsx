const ShopItem = ({ item }) => {
  const updateSold = (id) => {};

  return (
    <>
      <img src={item.link} alt={item.name} />
      <div>
        <h4>{item.name}</h4>

        {item.description && <p>{item.description}</p>}

        <section>
          <p>Price {item.price}</p>
          <button
            onClick={() => updateSold(item.id)}
            className={item.reserved ? "red" : "green"}
          >
            {item.reserved ? "Reserved" : "Reserve"}
          </button>
        </section>
      </div>
    </>
  );
};

export default ShopItem;
