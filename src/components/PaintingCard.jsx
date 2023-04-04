import { getAuth } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { Card, Button, Accordion } from "react-bootstrap";
import { fetchPaintingById } from "../fns/fetchFns";

const PaintingCard = ({ painting, ShopItem }) => {
  const auth = getAuth();
  console.log(auth.currentUser.uid);

  const updateReserved = async (id) => {
    console.log("click");

    if (auth.currentUser) {
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
    } else {
      toast.error("No user logged in please, try again later");
    }
  };

  return (
    <Card className="gap-4 p-1 border-0">
      <div className="w-100 d-flex flex-sm-row flex-column align-items-center justify-content-around gap-2">
        <Card.Title className=" m-0">{painting?.name}</Card.Title>
        <Card.Text className="m-0">Price £{painting?.price}</Card.Text>
        {ShopItem && (
          <Button
            onClick={() => updateReserved(painting.id)}
            disabled={
              auth.currentUser
                ? auth.currentUser.uid === painting.sellerId
                  ? true
                  : false
                : false
            }
            className={`${
              auth.currentUser
                ? painting?.reservedById !== ""
                  ? "btn-danger"
                  : "btn-success"
                : "btn-secondary"
            }`}
          >
            {painting?.reservedById ? "Reserved" : "Reserve"}
          </Button>
        )}
      </div>
      {ShopItem && painting?.description && (
        <Accordion defaultActiveKey="0" className=" p-2 rounded">
          <Accordion.Item eventKey="0">
            <Accordion.Header> About:</Accordion.Header>
            <Accordion.Body>{painting?.description}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
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
