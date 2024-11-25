import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton/OpenModalButton.jsx";
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
      <NavLink to="/">
        <h2>LOGO</h2>
      </NavLink>
      <div className="navbar-logo">
        <h2>GOLF COURSE</h2>
        <h3>Golf Course - City, State</h3>
      </div>
      <ul className="links">
        <ul>
          <NavLink to="/">Home</NavLink>
        </ul>
        <ul>
          <NavLink to="/restaurant">Restaurant</NavLink>
        </ul>
        <ul>
          <NavLink id="book" to="/calendar">
            Book a Tee Time
          </NavLink>
        </ul>
        {isLoaded && sessionLinks}
      </ul>
    </div>
  );
}

export default Navigation;
