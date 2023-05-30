import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Paintings from "./pages/Paintings";
import Sellers from "./pages/Sellers";
import Profile from "./pages/Profile";
import Shop from "./pages/Shop";
import ShopItem from "./pages/ShopItem";
import CreatePaintingCard from "./pages/CreatePaintingCard";
import EditPaintingCard from "./pages/EditPaintingCard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import About from "./pages/About";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paintings" element={<Paintings />} />
          <Route path="/sellers" element={<Sellers />} />

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<About />} />

          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route exact path="/shop/:sellerId" element={<Shop />} />
          <Route path="/shop/:sellerId/:paintingName" element={<ShopItem />} />

          <Route
            path="/create-painting/:sellerId"
            element={<CreatePaintingCard />}
          />
          <Route
            path="/edit-painting/:paintingId"
            element={<EditPaintingCard />}
          />
        </Routes>
      </Router>
      <ToastContainer position="top-left" autoClose={1000} />
    </>
  );
}

export default App;
