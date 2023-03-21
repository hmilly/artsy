import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { fetchPaintingsArr, fetchUserById } from "../fns/fetchFns";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import Spinner from "../components/Spinner";
import ProfileDetails from "../components/ProfileDetails";
import PaintingCard from "../components/PaintingCard";
import Layout from "../components/Layout";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();

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

  const onEdit = (id) => {
    navigate(`/edit-listing/${id}`);
  };

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
    return <Spinner />;
  }
  return (
    <Layout>
      <main className="m-4">
        <ProfileDetails
          profile={profile}
          formData={formData}
          setFormData={setFormData}
        />

        <div className="container">
          <h3>
            {profile.userRef === "sellers"
              ? "Items for sale"
              : "Your reserved items:"}
          </h3>
          {paintings.length !== 0 ? (
            <section className="row row-cols-1 row-cols-sm-2 align-items-start">
              {paintings?.map((painting) => (
                <div key={painting?.id} className="col">
                  <div className="card">
                    <button
                      className="border-0 align-self-end"
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
                      <PaintingCard painting={painting} lgImg={false} />
                    </Link>
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <p>No items to show</p>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Profile;
