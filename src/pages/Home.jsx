import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <header>
        <h1>Artsy</h1>

        <nav>
          <li>
            <Link to="sign-in">Sign in</Link>
          </li>
          <li>
            <Link to="sign-up">Sign Up</Link>
          </li>
        </nav>
      </header>
    </>
  );
};

export default Home;
