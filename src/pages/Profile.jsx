import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AiOutlineClose } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import {
  fetchPaintingsArr,
  fetchUserById,
  deleteFromStorage,
} from "../fns/fetchFns";
import LoadingState from "../components/LoadingState";
import Layout from "../components/Layout";
import ProfileDetails from "../components/ProfileDetails";
import PaintingCard from "../components/PaintingCard";
import Paginate from "../components/Paginate";

const Profile = () => {
  const auth = getAuth();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [paintings, setPaintings] = useState([]);
  const [formData, setFormData] = useState({
    name: auth?.currentUser?.displayName,
    number: "",
    email: auth?.currentUser?.email,
    about: "",
  });
  const [pageNo, setPageNo] = useState(1);
  const [noToDisplay] = useState(4);

  // get user by id
  useEffect(() => {
    const getProfile = async () => {
      try {
        const user = await fetchUserById(auth.currentUser.uid);
        await setProfile({ ...user, id: auth.currentUser.uid });
        setFormData({
          ...formData,
          number: await user.number,
          about: await user.about,
        });
      } catch (error) {
        toast.error("Could not fetch user");
      }
      setLoading(false);
    };
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get users paintings
  useEffect(() => {
    const getPaintings = async () => {
      try {
        if (profile.userRef !== undefined) {
          const ref =
            profile.userRef === "sellers" ? "sellerId" : "reservedById";
          const paintingArr = await fetchPaintingsArr(ref, profile.id);
          setPaintings(paintingArr);
        }
      } catch (error) {
        toast.error("Could not fetch paintings");
      }
    };
    getPaintings();
  }, [profile]);

  // unreserve painting for normal user
  const onDeleteForUser = async (painting) => {
    if (
      window.confirm(`Are you sure you want to unreserve ${painting.name}?`)
    ) {
      const paintingRef = doc(db, "paintings", painting.id);
      await updateDoc(paintingRef, {
        reservedById: "",
      });
      const updatedPaintings = paintings.filter(
        (paintings) => paintings.id !== painting.id
      );
      setPaintings(updatedPaintings);
      toast.success(`Successfully unreserved painting`);
    }
  };

  // delete painting for seller
  const onDeleteForSeller = async (painting) => {
    if (window.confirm(`Are you sure you want to delete ${painting.name}?`)) {
      // delete from painting collection
      await deleteDoc(doc(db, "paintings", painting.id));
      // update paintings shown on page
      const updatedPaintings = paintings.filter(
        (paintings) => paintings.id !== painting.id
      );
      setPaintings(updatedPaintings);
      toast.success(`Successfully deleted listing`);
      // also delete from strorage bucket
      await deleteFromStorage(painting.imgUrl);
    }
  };

  if (loading) {
    return <LoadingState />;
  }
  return (
    <Layout>
      <h2>Profile</h2>
      <ProfileDetails profile={profile} formData={formData} />
      <Row className="row-cols-2 justify-content-center row-cols-md-2 justify-content-md-between gap-2 py-4">
        <Col className="w-auto text-center">
          <h3>
            {profile.userRef === "sellers"
              ? "Items for sale (click card to edit listing)"
              : "Your reserved items:"}
          </h3>
        </Col>
        {profile.userRef === "sellers" && (
          <Col className="w-auto d-flex justify-self-end">
            <Link
              to={`/create-painting/${auth.currentUser.uid}`}
              className="btn btn-primary"
            >
              <BiImageAdd className="fs-3" aria-label="add painting" />
            </Link>
          </Col>
        )}
      </Row>
      {paintings.length !== 0 ? (
        <>
          <Row className="row-cols-1 row-cols-sm-2 align-items-start">
            {paintings
              ?.slice(pageNo * noToDisplay - noToDisplay, pageNo * noToDisplay)
              .map((painting) => (
                <Col key={painting?.id} className="p-2">
                  <Card>
                    <button
                      className="border-0 align-self-end "
                      onClick={() =>
                        profile.userRef === "sellers"
                          ? onDeleteForSeller(painting)
                          : onDeleteForUser(painting)
                      }
                    >
                      <AiOutlineClose
                        className="img-fluid align-self-end"
                        aria-label="close"
                      />
                    </button>
                    <Link
                      className="p-2 h-100 link-dark text-decoration-none"
                      to={
                        profile.userRef === "sellers"
                          ? `/edit-painting/${painting.id}`
                          : `/shop/${painting.sellerId}/${painting.name
                              .toLowerCase()
                              .split(" ")
                              .join("-")}`
                      }
                    >
                      <PaintingCard painting={painting} ShopItem={false} />
                    </Link>
                  </Card>
                </Col>
              ))}
          </Row>
          <Row as="section" className="p-3">
            <Paginate
              arrLength={paintings.length}
              pageNo={pageNo}
              setPageNo={setPageNo}
              noToDisplay={noToDisplay}
            />
          </Row>
        </>
      ) : (
        <p>No items to show</p>
      )}
    </Layout>
  );
};

export default Profile;
