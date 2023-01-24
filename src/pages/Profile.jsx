import { useState, useEffect } from "react";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { updateDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
import Spinner from "../components/Spinner";
import { fetchPaintings, fetchUser } from "../fns/fetchFns";
import ShopItem from "../components/ShopItem";

const Profile = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [changeDetails, setChangeDetails] = useState(false);
  const [user, setUser] = useState({});
  const [paintings, setPaintings] = useState([]);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    number: "",
    email: auth.currentUser.email,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user.userRef === "sellers") {
      setLoading(true);
      fetchPaintings(auth.currentUser.uid)
        .then((p) => setPaintings(p))
        .then(() => setLoading(false))
        .catch((e) => toast.error("Could not fetch paintings"));
    }
  }, [auth.currentUser.uid]);

  useEffect(() => {
    fetchUser(auth.currentUser.uid)
      .then((u) => {
        setUser(u);
        setFormData({ ...formData, number: u.number });
      })
      .then(() => setLoading(false))
      .catch((e) => toast.error("Could not fetch user reference"));
  }, [auth.currentUser.uid]);

  const onSubmit = async () => {
    try {
      if (
        auth.currentUser.displayName !== formData.name ||
        user.number !== formData.number ||
        auth.currentUser.email !== formData.email
      ) {
        // Update display name in firebase authentication
        await updateProfile(auth.currentUser, { displayName: formData.name });
        await updateEmail(auth.currentUser, formData.email);
      }
      // Update in firestore db
      const userRef = doc(db, user.userRef, auth.currentUser.uid);
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

  const onLogOut = () => {
    auth.signOut();
    setUser({});
    navigate("/");
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <header className="d-flex justify-content-between">
        <h2>My Profile</h2>
        <Link to="/" className="btn btn-sm btn-outline-light">
          <img src={homeIcon} alt="home" className="img-fluid" />
        </Link>
        <button
          className="btn btn-sm btn-success rounded-pill"
          type="button"
          onClick={onLogOut}
        >
          Log Out
        </button>
      </header>
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
            {user?.userRef.charAt(0).toUpperCase() + user.userRef.slice(1, -1)}
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
        <div>
          <h3>Items for sale</h3>
          {paintings.length !== 0 ? (
            <>
              <p>Your listings</p>
              <section className="row row-cols-1 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
                <ShopItem paintings={paintings} />
              </section>
            </>
          ) : (
            <p>No items to show</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Profile;
