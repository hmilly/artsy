import Form  from "react-bootstrap/Form";

const SellerPaintingForm = ({ formData, setFormData }) => {
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
      setFormData((prevState) => ({
        ...prevState,
        imgData: e.target.files,
        imgUrl: URL.createObjectURL(e.target.files[0]),
      }));
    }

    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  return (
    <>
      <Form.Group className="d-flex flex-column mb-3">
        <Form.Label className=" mb-1">Name</Form.Label>
        <Form.Control
          className=" border-primary border-2 rounded-pill"
          type="text"
          id="name"
          value={name}
          onChange={onMutate}
          maxLength="32"
          minLength="5"
          required
        />
      </Form.Group>
      <Form.Group className="d-flex flex-column mb-3">
        <Form.Label className=" mb-1">Price in £</Form.Label>
        <Form.Control
          className=" border-primary border-2 rounded-pill"
          type="number"
          id="price"
          value={price}
          onChange={onMutate}
          min="5"
          max="500"
          required
        />
      </Form.Group>
      <Form.Group className="d-flex flex-column mb-3 h-100">
        <Form.Label className=" mb-1">Description</Form.Label>
        <Form.Control
          as="textarea"
          className="border-primary border-2 rounded form-control"
          type="textarea"
          id="description"
          value={description}
          onChange={onMutate}
          maxLength="500"
          minLength="10"
          required
        />
        <p className="text-end">{`${
          500 - description.length
        } characters remaining`}</p>
      </Form.Group>

      <Form.Group className="d-flex flex-column mb-3">
        <Form.Label className=" mb-1">Image</Form.Label>
        <Form.Control
          className=" border-primary border-2 rounded w-100 py-1 form-control-file"
          type="file"
          id="image"
          onChange={onMutate}
          max="1"
          accept=".jpg,.png,.jpeg"
        />
      </Form.Group>
    </>
  );
};

export default SellerPaintingForm;
