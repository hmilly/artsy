import { useState, useEffect } from "react";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { updateDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import { fetchPaintingsArr, fetchUserById } from "../fns/fetchFns";
import Spinner from "../components/Spinner";
import PaintingCard from "../components/PaintingCard";
import Layout from "../components/Layout";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [changeDetails, setChangeDetails] = useState(false);
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

  const onSubmit = async () => {
    try {
      if (
        auth.currentUser.displayName !== formData.name ||
        profile.number !== formData.number ||
        auth.currentUser.email !== formData.email
      ) {
        // Update display name in firebase authentication
        await updateProfile(auth.currentUser, { displayName: formData.name });
        await updateEmail(auth.currentUser, formData.email);
      }
      // Update in firestore db
      const userRef = doc(db, profile.userRef, auth.currentUser.uid);
      await updateDoc(userRef, {
        name: formData.name,
        number: formData.number,
        email: formData.email,
      });

      //update auth
      auth.currentUser.displayName = formData.name;
      auth.currentUser.email = formData.email;
    } catch (error) {
      console.log(error);
      toast.error("Couldn't update profile details!");
    }
  };

  const onChange = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));

  const onDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete? ${id}`)) {
      await deleteDoc(doc(db, "paintings", id));
      const updatedPaintings = paintings.filter(
        (paintings) => paintings.id !== id
      );
      setPaintings(updatedPaintings);
      toast.success(`Successfully deleted listing`);
    }
  };

  const onEdit = (id) => {
    navigate(`/edit-listing/${id}`);
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <Layout>
      <main className="m-4">
        <div className="container m-4 border border-success border-2 rounded mx-auto">
          <div className="row d-flex justify-content-between p-3">
            <p className="w-auto">Personal Details</p>
            <a
              className="btn fw-bold row text-success w-auto mx-1"
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((prevState) => !prevState);
              }}
            >
              {changeDetails ? "Done" : "Change"}
            </a>
          </div>
          <h3 className="text-center">
            Account type:{" "}
            {profile?.userRef.charAt(0).toUpperCase() +
              profile.userRef.slice(1, -1)}
          </h3>
          <form className="row p-3 mx-auto">
            <input
              type="text"
              id="name"
              className={`border border-light rounded-pill py-1 px-5 mb-3 ${
                !changeDetails ? "" : "bg-secondary bg-opacity-25"
              }`}
              disabled={!changeDetails}
              value={formData?.name}
              onChange={onChange}
            />
            <input
              type="tel"
              id="number"
              className={`border border-light rounded-pill py-1 px-5 mb-3 ${
                !changeDetails ? "" : "bg-secondary bg-opacity-25"
              }`}
              disabled={!changeDetails}
              value={formData?.number}
              onChange={onChange}
            />
            <input
              type="text"
              id="email"
              className={`border border-light rounded-pill py-1 px-5 mb-3 ${
                !changeDetails ? "" : "bg-secondary bg-opacity-25"
              }`}
              disabled={!changeDetails}
              value={formData?.email}
              onChange={onChange}
            />
          </form>
        </div>

        <div className="container">
          <h3>
            {profile.userRef === "sellers"
              ? "Items for sale"
              : "Reserved by you"}
          </h3>
          {paintings.length !== 0 ? (
            <section className="row">
              {paintings?.map((painting) => (
                <div key={painting?.id} className="col">
                  <div className="card">
                    <Link
                      to={
                        profile.userRef === "sellers"
                          ? `/edit-painting/${painting.id}`
                          : `${painting.name
                              .toLowerCase()
                              .split(" ")
                              .join("-")}`
                      }
                    >
                      <PaintingCard painting={painting} lgImg={false} />
                    </Link>
                    {painting?.reservedById !== "" && (
                      <span className="badge bg-danger rounded-pill">
                        Reserved
                      </span>
                    )}
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
