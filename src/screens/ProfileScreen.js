import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/counter/userSlice";
import { auth } from "../Firebase";
import Nav from "../Nav";
import PlansScreen from "./PlansScreen";
import "./ProfileScreen.css";

function ProfileScreen() {
  const history = useNavigate();
  const user = useSelector(selectUser);
  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
            alt="profile image"
          />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <h3>Plans </h3>
              <PlansScreen />
              <button
                className="profileScreen__signOut"
                onClick={() => {
                  auth.signOut();
                  history("/");
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
