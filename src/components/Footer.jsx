import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="d-flex flex-column align-items-center text-bg-dark p-2">
      <p className="w-75 text-center">
        Copyright © 2023 Artsy - All Rights Reserved.
      </p>
      <Link to="/privacy-policy" onClick={() => window.scrollTo(0, 0)}>
        Privacy Policy
      </Link>
    </footer>
  );
};

export default Footer;
