import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="vh-100 d-flex flex-column justify-content-between">
      <Header />
      <div className="flex-fill" style={{ marginTop: "130px" }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
