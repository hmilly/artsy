import Form  from "react-bootstrap/Form";

const ProfileForm = ({ formData, onChange, changeDetails }) => {
  return (
    <>
      <Form.Control
        type="text"
        className="border border-primary border-1 rounded-pill py-2 px-5 mb-3"
        placeholder="Name"
        id="name"
        value={formData.name}
        onChange={onChange}
        disabled={!changeDetails}
        required
      />
      <Form.Control
        type="email"
        className="border border-primary border-1 rounded-pill py-2 px-5 mb-3"
        placeholder="Email"
        id="email"
        value={formData.email}
        onChange={onChange}
        disabled={!changeDetails}
        required
      />
      <Form.Control
        type="tel"
        className="border border-primary border-1 rounded-pill py-2 px-5 mb-3"
        placeholder="Phone Number"
        id="number"
        value={formData.number}
        onChange={onChange}
        disabled={!changeDetails}
        required
      />
    </>
  );
};

export default ProfileForm;
