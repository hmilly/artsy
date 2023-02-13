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
    <>
      <div className="row d-flex justify-content-center mb-4">
        <label className="formLabel mb-1">Name</label>
        <input
          className="border border-primary border-2 rounded-pill text-center w-75"
          type="text"
          id="name"
          value={name}
          onChange={onMutate}
          maxLength="32"
          minLength="5"
          required
        />
      </div>
      <div className="row d-flex justify-content-center mb-4">
        <label className="formLabel mb-1">Price in £</label>
        <input
          className="border border-primary border-2 rounded-pill text-center w-75"
          type="number"
          id="price"
          value={price}
          onChange={onMutate}
          min="5"
          max="500"
          required
        />
      </div>
      <div className="row d-flex justify-content-center mb-4">
        <label className="formLabel mb-1">Description</label>
        <textarea
          className="border border-primary border-2 rounded form-control w-75 h-50"
          type="textarea"
          id="description"
          value={description}
          onChange={onMutate}
          maxLength="500"
          minLength="10"
          required
        />
      </div>

      <div className="row d-flex justify-content-center mb-4 mx-1">
        <label className="formLabel mb-1">Image</label>
        <input
          className="border border-primary border-2 rounded w-100 py-1 form-control-file"
          type="file"
          id="image"
          onChange={onMutate}
          max="1"
          accept=".jpg,.png,.jpeg"
          multiple
          required
        />
      </div>
    </>
  );
};

export default FormBody;
