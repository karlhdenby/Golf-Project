import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton/OpenModalButton.jsx"
import LoginFormModal from "../LoginFormModal/LoginFormModal.jsx";
import SignupFormModal from "../SignupFormModal/SignupFormModal.jsx";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ul className="profile-button">
        <ProfileButton user={sessionUser} />
      </ul>
    );
  } else {
    sessionLinks = (
      <>
        <ul>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </ul>
        <ul>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </ul>
      </>
    );
  }

  return (
    <div className="navbar">
      <img className="bird-logo" src="/bird-logo.png" alt="gleneaglelogo" />
    <NavLink to="/" className="navbar-logo">
    <h2>
      GLENEAGLE
    </h2>
    <h3>
      Golf Course - Arlington, WA
    </h3>
        {/* <img
          src="/image-removebg.png"
          alt="Airbnb logo"
          className="logo"
        /> */}
      </NavLink>
    <ul className="links">
      <ul>
        <NavLink to="/">Home</NavLink>
      </ul>
      <ul>
        <NavLink to="/restaurant">Restaurant</NavLink>
      </ul>
      {isLoaded && sessionLinks}
    </ul>
    </div>
  );
}

export default Navigation;
