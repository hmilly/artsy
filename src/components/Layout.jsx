import Container from "react-bootstrap/Container";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="vh-100 d-flex flex-column justify-content-between">
      <Header />
      <main className="flex-fill" style={{ marginTop: "150px" }}>
        <Container className="p-2">{children}</Container>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
