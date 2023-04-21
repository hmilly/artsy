import Spinner from "react-bootstrap/Spinner";

const LoadingState = () => {
  return (
    <div className="position-fixed fixed-top h-100 text-bg-dark d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingState;
