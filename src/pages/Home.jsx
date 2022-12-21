const Home = () => {
  return (
    <>
      <header>
        <h1>Artsy</h1>

        <nav>
          <li>
            <Link to="sign-in"></Link>
          </li>
          <li>
            <Link to="sign-up"></Link>
          </li>
        </nav>
      </header>
    </>
  );
};

export default Home;
