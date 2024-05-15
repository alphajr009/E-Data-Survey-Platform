import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Home from "./pages/Home";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";
import Complete from "./pages/Complete";
import Multiple from "./pages/Multiple";
import TrueFalse from "./pages/TrueFalse";
import Rating from "./pages/Rating";
import Response from "./pages/Response";
import SurveyDetails from "./pages/SurveyDetails";
import AboutUs from "./pages/AboutUs";
import Account from "./pages/user/Account";

const UserRouteGuard = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

const AdminRouteGuard = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user && user.isAdmin) {
    return <Admin />;
  } else {
    return <Navigate to="/home" />;
  }
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} exact />
          <Route path="/signup" element={<SignUp />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/home" element={<Home />} exact />
          <Route path="/responses" element={<Response />} exact />
          <Route path="/about-us" element={<AboutUs />} exact />
          <Route
            path="/account"
            element={
              <UserRouteGuard>
                <Account />
              </UserRouteGuard>
            }
            exact
          />

          <Route path="/complete/:tokenID" element={<Complete />} exact />
          <Route
            path="/surveydetails/:tokenID"
            element={<SurveyDetails />}
            exact
          />

          <Route
            path="/survey/multiple/:tokenID"
            element={<Multiple />}
            exact
          />
          <Route
            path="/survey/truefalse/:tokenID"
            element={<TrueFalse />}
            exact
          />
          <Route path="/survey/rating/:tokenID" element={<Rating />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
