const FormBody = ({ formData, setFormData }) => {
  const { description, name, price, reserved } = formData;

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
      <label className="formLabel">Name</label>
      <input
        className="formInputName"
        type="text"
        id="name"
        value={name}
        onChange={onMutate}
        maxLength="32"
        minLength="5"
        required
      />

      <label className="formLabel">Description</label>
      <input
        className="formInputName"
        type="text"
        id="description"
        value={description}
        onChange={onMutate}
        maxLength="300"
        minLength="10"
        required
      />

      <label className="formLabel">Reserved</label>
      <div className="formButtons">
        <button
          className={reserved ? "formButtonActive" : "formButton"}
          type="button"
          id="reserved"
          value={true}
          onClick={onMutate}
        >
          Yes
        </button>
        <button
          className={
            !reserved !== null ? "formButtonActive" : "formButton"
          }
          type="button"
          id="reserved"
          value={false}
          onClick={onMutate}
        >
          No
        </button>
      </div>

      <label className="formLabel">Price</label>
      <div className="formPriceDiv">
        <input
          className="formInputSmall"
          type="number"
          id="price"
          value={price}
          onChange={onMutate}
          min="5"
          max="500"
          required
        />
      </div>

      <label className="formLabel">Image</label>
      <input
        className="formInputFile"
        type="file"
        id="image"
        onChange={onMutate}
        max="1"
        accept=".jpg,.png,.jpeg"
        multiple
        required
      />
    </>
  );
};

export default FormBody;
