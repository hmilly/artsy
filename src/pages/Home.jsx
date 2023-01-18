import { Link } from "react-router-dom";


const Home = () => {
  return (
    <>
      <header className="d-flex  justify-content-between w-100">
        <h1 className="w-75 text-center">Artsy</h1>

        <nav className="w-25 m-auto">
          <ul className="d-flex justify-content-between m-0 list-unstyled">
            <li>
              <Link className="registerLink" to="sign-in">
                Sign in
              </Link>
            </li>
            <li>
              <Link className="registerLink" to="sign-up">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
      
      
      </main>
    </>
  );
};

export default Home;
