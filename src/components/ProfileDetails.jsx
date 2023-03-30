import { useState } from "react";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { updateDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { Container, Row, Form } from "react-bootstrap";

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
    <Container as='section' className="border border-success border-2 rounded my-4 mx-auto">
      <Row className="justify-content-between p-3">
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
      </Row>
      <h3 className="text-center">
        Account type:{" "}
        {profile?.userRef.charAt(0).toUpperCase() +
          profile.userRef.slice(1, -1)}
      </h3>
      <Form className="p-1 p-sm-3 mx-auto">
        <Form.Control
          type="text"
          id="name"
          className={` rounded-pill py-1 px-3 px-sm-5 mb-3 ${
            !changeDetails ? "" : "bg-secondary bg-opacity-25"
          }`}
          disabled={!changeDetails}
          value={formData?.name}
          onChange={onChange}
        />
        <Form.Control
          type="tel"
          id="number"
          className={` rounded-pill py-1 px-3 px-sm-5 mb-3 ${
            !changeDetails ? "" : "bg-secondary bg-opacity-25"
          }`}
          disabled={!changeDetails}
          value={formData?.number}
          onChange={onChange}
        />
        <Form.Control
          type="text"
          id="email"
          className={`rounded-pill py-1 px-3 px-sm-5 mb-3 ${
            !changeDetails ? "" : "bg-secondary bg-opacity-25"
          }`}
          disabled={!changeDetails}
          value={formData?.email}
          onChange={onChange}
        />
      </Form>
    </Container>
  );
};

export default ProfileDetails;
