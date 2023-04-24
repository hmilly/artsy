import { useRef, useState } from "react";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import {
  Card,
  Button,
  Accordion,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

const PaintingCard = ({ painting, ShopItem }) => {
  const [reserved, setReserved] = useState(
    painting?.reservedById === "" ? false : true
  );
  const [userId] = useState(localStorage.getItem("user"));

  const ref = useRef();

  const updateReserved = async (id) => {
    // if no user signed in (using localstorage)
    if (userId !== null) {
      // otherwise get painting data by id
      const paintingRef = doc(db, "paintings", id);
      const paintingSnap = await getDoc(paintingRef);
      const pRef = await paintingSnap.data();
      // if user has same id as painting seller
      // unreserve item
      if (pRef.reservedById === userId) {
        await updateDoc(paintingRef, {
          reservedById: "",
        });
        toast.success(`Successfully unreserved item`);
        setReserved(false);
      } else if (pRef.reservedById === "") {
        // if painting unreserved, update painting adding user id
        await updateDoc(paintingRef, {
          reservedById: userId,
        });
        toast.success(`Reserved item!`);
        setReserved(true);
      } else {
        toast.error("Painting has all ready been reserved!");
      }
    } else {
      toast.error("No user logged in please, try again later");
    }
  };

  return (
    <Card className="gap-4 p-1 border-0 h-100">
      <div className="w-100 d-flex flex-sm-row flex-column align-items-center justify-content-around gap-2">
        <Card.Title className=" m-0">{painting?.name}</Card.Title>
        <Card.Text className="m-0">Price £{painting?.price}</Card.Text>
        {ShopItem && userId !== painting?.sellerId && (
          <div ref={ref}>
            <OverlayTrigger
              placement="bottom"
              container={ref}
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id="button-tooltip" className="position-absolute">
                  {!reserved
                    ? "Click to register your interest"
                    : painting.reservedById === userId
                    ? "Reserved by you!"
                    : "Reserved by another user"}
                </Tooltip>
              }
            >
              <Button
                variant="success"
                onClick={() => updateReserved(painting.id)}
                disabled={userId !== null ? false : true}
                className={`${reserved ? "btn-danger" : "btn-success"}`}
              >
                {reserved ? "Reserved" : "Reserve"}
              </Button>
            </OverlayTrigger>
          </div>
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
        className={`img-fluid w-75 m-auto`}
      />
    </Card>
  );
};

export default PaintingCard;
