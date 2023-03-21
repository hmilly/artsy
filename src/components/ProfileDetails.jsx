import { useState } from "react";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { updateDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

const ProfileDetails = ({ profile, formData, setFormData }) => {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);

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

  return (
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
  );
};

export default ProfileDetails;
