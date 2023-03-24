import { Row, Form } from "react-bootstrap";

const FormBody = ({ formData, setFormData }) => {
  const { description, name, price } = formData;

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    if (e.target.files) {
      setFormData((prevState) => ({ ...prevState, image: e.target.files }));
    }

    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  return (
    <Form.Group>
      <Row className="justify-content-center mb-4">
        <Form.Label className="formForm.Label mb-1">Name</Form.Label>
        <Form.Control
          className="border border-primary border-2 rounded-pill text-center w-75"
          type="text"
          id="name"
          value={name}
          onChange={onMutate}
          maxLength="32"
          minLength="5"
          required
        />
      </Row>
      <Row className="justify-content-center mb-4">
        <Form.Label className="formForm.Label mb-1">Price in £</Form.Label>
        <Form.Control
          className="border border-primary border-2 rounded-pill text-center w-75"
          type="number"
          id="price"
          value={price}
          onChange={onMutate}
          min="5"
          max="500"
          required
        />
      </Row>
      <Row className="justify-content-center mb-4">
        <Form.Label className="formForm.Label mb-1">Description</Form.Label>
        <Form.Control
          className="border border-primary border-2 rounded form-control w-75 h-50"
          type="textarea"
          id="description"
          value={description}
          onChange={onMutate}
          maxLength="500"
          minLength="10"
          required
        />
      </Row>

      <Row className="justify-content-center mb-4 mx-1">
        <Form.Label className="formForm.Label mb-1">Image</Form.Label>
        <Form.Control
          className="border border-primary border-2 rounded w-100 py-1 form-control-file"
          type="file"
          id="image"
          onChange={onMutate}
          max="1"
          accept=".jpg,.png,.jpeg"
          multiple
          required
        />
      </Row>
    </Form.Group>
  );
};

export default FormBody;
