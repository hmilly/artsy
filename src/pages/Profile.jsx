import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { fetchPaintingsArr, fetchUserById } from "../fns/fetchFns";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { Container, Row, Col, Card } from "react-bootstrap";
import LoadingState from "../components/LoadingState";
import ProfileDetails from "../components/ProfileDetails";
import PaintingCard from "../components/PaintingCard";
import Layout from "../components/Layout";

const Profile = () => {
  const auth = getAuth();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [paintings, setPaintings] = useState([]);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    number: "",
    email: auth.currentUser.email,
  });

  useEffect(() => {
    const getProfile = async () => {
      try {
        const user = await fetchUserById(auth.currentUser.uid);
        await setProfile({ ...user, id: auth.currentUser.uid });
        setFormData({ ...formData, number: await user.number });
      } catch (error) {
        toast.error("Could not fetch user");
      }
      setLoading(false);
    };

    getProfile();
  }, [auth.currentUser.uid]);

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

  const onDelete = async (painting) => {
    if (window.confirm(`Are you sure you want to delete ${painting.name}?`)) {
      await deleteDoc(doc(db, "paintings", painting.id));
      const updatedPaintings = paintings.filter(
        (paintings) => paintings.id !== painting.id
      );
      setPaintings(updatedPaintings);
      toast.success(`Successfully deleted listing`);
    }
  };

  if (loading) {
    return <LoadingState />;
  }
  return (
    <Layout>
      <Container as="main">
        <h2>Profile</h2>
        <ProfileDetails
          profile={profile}
          formData={formData}
          setFormData={setFormData}
        />
        <Row className="my-3 mx-1 justify-content-between w-100">
          <Col className="col-auto">
            <h3>
              {profile.userRef === "sellers"
                ? "Items for sale (click card to edit listing)"
                : "Your reserved items:"}
            </h3>
          </Col>
          {profile.userRef === "sellers" && (
            <Col className="col-2 d-flex justify-content-end ">
              <Link
                to={`/create-painting/${auth.currentUser.uid}`}
                className="btn btn-primary"
              >
                <BiImageAdd className="fs-3" />
              </Link>
            </Col>
          )}
        </Row>
        {paintings.length !== 0 ? (
          <Row className="row-cols-1 row-cols-sm-2 align-items-start">
            {paintings?.map((painting) => (
              <Col key={painting?.id} className="p-2">
                <Card>
                  <button
                    className="border-0 align-self-end "
                    onClick={() => onDelete(painting)}
                  >
                    <AiOutlineClose className="img-fluid align-self-end" />
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
        ) : (
          <p>No items to show</p>
        )}
      </Container>
    </Layout>
  );
};

export default Profile;
