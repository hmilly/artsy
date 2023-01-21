const ShopItem = ({ paintings }) => {
  const updateSold = (id) => {
    console.log(id);
  };

  // const [paintings, setPaintings] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const colRef = collection(db, "paintings");
  //     const docSnap = await getDocs(colRef);

  //     const paintingsArr = [];
  //     docSnap.forEach((doc) => paintingsArr.push(doc.data()));

  //     setPaintings(paintingsArr);
  //     setLoading(false);
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      {paintings?.map((paintingData) => (
        <div key={paintingData.id} className="col">
          <div className="card">
            <img
              src={paintingData?.imgUrl}
              alt={paintingData?.name}
              className="img-fluid img-thumbnail"
            />
            <div className="card-body">
              <h4 className="card-title">{paintingData?.name}</h4>

              {paintingData?.description && (
                <p className="card-text">{paintingData?.description}</p>
              )}

              <section>
                <p>Price {paintingData?.price}</p>
                <button
                  onClick={() => updateSold(paintingData)}
                  className={paintingData?.reserved ? "red" : "green"}
                >
                  {paintingData?.reserved ? "Reserved" : "Reserve"}
                </button>
              </section>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShopItem;
