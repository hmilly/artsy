import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { updateDoc, doc } from "firebase/firestore";
import { Card, Button, Accordion } from "react-bootstrap";
import { fetchPaintingById } from "../fns/fetchFns";

const PaintingCard = ({ painting, ShopItem }) => {
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
    <Card className="gap-4 p-1">
      <div className="w-100 d-flex flex-sm-row flex-columnalign-items-center justify-content-around gap-2">
        <Card.Title className=" m-0">{painting?.name}</Card.Title>
        <Card.Text className="m-0">Price £{painting?.price}</Card.Text>
        {ShopItem && (
          <Button
            onClick={() => updateReserved(painting.id)}
            className={`${
              painting?.reservedById !== "" ? "btn-danger" : "btn-success"
            }`}
          >
            {painting?.reservedById ? "Reserved" : "Reserve"}
          </Button>
        )}
      </div>
      {ShopItem && painting?.description && (
        <Card.Text className="m-sm-4 mx-0">
          <Accordion defaultActiveKey="0" className=" p-2 rounded">
            <Accordion.Item eventKey="0">
              <Accordion.Header> About:</Accordion.Header>
              <Accordion.Body>{painting?.description}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Text>
      )}
      <img
        src={painting?.imgUrl}
        alt={painting?.name}
        className={`img-fluid ${ShopItem ? "w-75" : "w-50"} align-self-center`}
      />
    </Card>
  );
};

export default PaintingCard;
