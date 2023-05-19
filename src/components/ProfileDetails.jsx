import { useState } from "react";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { Container, Row, Form } from "react-bootstrap";
import ProfileForm from "./ProfileForm";

const ProfileDetails = ({ profile, formData }) => {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [newDetails, setNewDetails] = useState(formData);

  const onSubmit = async () => {
    try {
      if (
        auth.currentUser.displayName !== newDetails.name ||
        auth.currentUser.email !== newDetails.email
      ) {
        // Update display name in firebase authentication
        await updateProfile(auth.currentUser, { displayName: newDetails.name });
        await updateEmail(auth.currentUser, newDetails.email);
      }
      // Update in firestore db
      const userRef = doc(db, profile.userRef, auth.currentUser.uid);
      await updateDoc(userRef, {
        name: newDetails.name,
        number: newDetails.number,
        email: newDetails.email,
      });
      if (profile.userRef === "sellers") {
        await updateDoc(userRef, {
          about: newDetails.about,
        });
      }

      //update auth
      auth.currentUser.displayName = newDetails.name;
      auth.currentUser.email = newDetails.email;
    } catch (error) {
      console.log(error);
      toast.error("Couldn't update profile details!");
    }
  };

  const onChange = (e) =>
    setNewDetails((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));

  return (
    <Container
      as="section"
      className="border border-success border-2 rounded my-4 mx-auto"
    >
      <Row className="justify-content-center justify-content-sm-between  p-3">
        <p className="w-auto my-auto">Personal Details</p>
        <button
          className="btn fw-bold row text-success w-auto mx-1"
          onClick={() => {
            changeDetails && onSubmit();
            setChangeDetails((prevState) => !prevState);
          }}
        >
          {changeDetails ? "Done" : "Change"}
        </button>
      </Row>
      <h3 className="text-center">
        Account type:{" "}
        {profile?.userRef.charAt(0).toUpperCase() +
          profile.userRef.slice(1, -1)}
      </h3>
      <Form
        className={`p-1 p-sm-3 mx-auto rounded ${
          !changeDetails ? "" : "bg-secondary bg-opacity-25"
        }`}
      >
        <ProfileForm
          formData={newDetails}
          onChange={onChange}
          changeDetails={changeDetails}
        />
        {profile.userRef === "sellers" && (
          <Form.Group className="py-2 mb-3">
            <Form.Label>About:</Form.Label>
            <Form.Control
              as="textarea"
              className="form-control"
              style={{ height: "150px" }}
              type="text"
              value={newDetails?.about}
              disabled={!changeDetails}
              onChange={onChange}
              maxLength="400"
              minLength="10"
              id="about"
              rows={4}
            />
            <p className="text-end">{`${
              400 - newDetails?.about.length
            } characters remaining`}</p>
          </Form.Group>
        )}
      </Form>
    </Container>
  );
};

export default ProfileDetails;
