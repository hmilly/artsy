import { useState, useEffect } from "react";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
import Spinner from "../components/Spinner";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [changeDetails, setChangeDetails] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  useEffect(() => {
    const fetchUser = async () => {
      const customersRef = collection(db, "users");

      // const q = query(
      //   customersRef,
      //   where("userRef", "==", auth.currentUser.uid)
      // );
      // const querySnap = await getDocs(q);

      // querySnap.forEach((doc) => {
      //   listings.push({ id: doc.id, data: doc.data() });
      // });

      console.log(auth.currentUser);
      // setListings(listings);
      setLoading(false);
    };

    fetchUser();
  }, [auth.currentUser.uid]);

  const onSubmit = async () => {
    try {
      if (
        auth.currentUser.displayName !== formData.name ||
        auth.currentUser.email !== formData.email
      ) {
        // Update display name in fb
        await updateProfile(auth.currentUser, { displayName: formData.name });
        await updateEmail(auth.currentUser, formData.email);
      }

      // Update in firestore
      const userRef = doc(db, "users", auth.currentUser.uid);

      await updateDoc(userRef, { name: formData.name, email: formData.email });
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
      await deleteDoc(doc(db, "listings", id));
      const updatedListings = listings.filter((listing) => listing.id !== id);
      setListings(updatedListings);
      toast.success(`Successfully deleted listing`);
    }
  };

  const onEdit = (id) => {
    navigate(`/edit-listing/${id}`);
  };

  const onLogOut = () => {
    auth.signOut();
    navigate("/");
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
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
      <main className="container m-4 border border-success border-2 rounded w-75 mx-auto">
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
        <form className="row p-3 mx-auto">
          <input
            type="text"
            id="name"
            className={`border border-light rounded-pill py-1 px-5 mb-3 ${
              !changeDetails ? "" : "bg-secondary bg-opacity-25"
            }`}
            disabled={!changeDetails}
            value={formData.name}
            onChange={onChange}
          />
          <input
            type="text"
            id="email"
            className={`border border-light rounded-pill py-1 px-5 mb-3 ${
              !changeDetails ? "" : "bg-secondary bg-opacity-25"
            }`}
            disabled={!changeDetails}
            value={formData.email}
            onChange={onChange}
          />
        </form>
      </main>
      {!loading && listings?.length > 0 && (
        <div>
          <p className="listingText">Your listings</p>
          <ul className="listingList"></ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
