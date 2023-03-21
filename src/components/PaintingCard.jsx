import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { updateDoc, doc } from "firebase/firestore";

import { fetchPaintingById } from "../fns/fetchFns";

const PaintingCard = ({ painting, lgImg }) => {
  const auth = getAuth();

  const updateReserved = async (id) => {
    // const userRef = doc(db, user.userRef, auth.currentUser.uid);
    // await updateDoc(userRef, {
    //   name: formData.name,
    //   number: formData.number,
    //   email: formData.email,
    // });
    // return await db
    //   .collection("paintings")
    //   .doc(id)
    //   .update({ reservedById: auth.currentUser.uid });
  };

  return (
    <div className="d-flex flex-column h-100 align-items-center gap-4 p-1">
      <section className="d-flex w-100 align-items-center justify-content-around">
        <h4 className="card-title text-center m-0">{painting?.name}</h4>
        <p className="card-text m-0">Price £{painting?.price}</p>

        {lgImg && (
          <button
            onClick={() => updateReserved(painting.id)}
            className={`m-2 btn rounded-pill ${
              painting?.reservedById !== "" ? "btn-danger" : "btn-success"
            }`}
          >
            {painting?.reservedById ? "Reserved" : "Reserve"}
          </button>
        )}
      </section>

      {lgImg && (
        <p className="w-75 border border-secondary p-2 rounded">
          {painting?.description}
        </p>
      )}

      <img
        src={painting?.imgUrl}
        alt={painting?.name}
        className={`img-fluid ${lgImg ? "w-75" : "w-50"}`}
      />
    </div>
  );
};

export default PaintingCard;
