import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Shop from "./pages/Shop";
import ShopItem from "./pages/ShopItem";
import CreatePaintingCard from "./pages/CreatePaintingCard";
import EditPaintingCard from "./pages/EditPaintingCard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route exact path="/shop/:shopId" element={<Shop />} />
          <Route path="/shop/:shopId/:paintingName" element={<ShopItem />} />
          <Route
            path="/create-painting-card"
            element={<CreatePaintingCard />}
          />
          <Route
            path="/edit-painting/:paintingId"
            element={<EditPaintingCard />}
          />

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
