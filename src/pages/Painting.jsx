import { Link } from "react-router-dom";

const Painting = ({ painting }) => {
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
    <div key={painting.id} className="col">
      <div className="card">
        <img
          src={painting?.imgUrl}
          alt={painting?.name}
          className="img-fluid img-thumbnail"
        />
        <div className="card-body">
          <h4 className="card-title">{painting?.name}</h4>

          {painting?.description && (
            <p className="card-text">{painting?.description}</p>
          )}

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
      </div>
    </div>
  );
};

export default Painting;
