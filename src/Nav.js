import React, { useEffect, useState, useHistory } from "react";
import { useNavigate } from "react-router-dom";

import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);
  const history = useNavigate();
  // in react-router-dom v6 useHistory is replaced by  useNavigate()
  // history.push('/path') replaced by history('/path');
  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          className="nav__logo"
          src="https://www.freepnglogos.com/uploads/red-netflix-logo-text-png-3.png"
          alt=""
        />

        <img
          onClick={() => history("/profile")}
          className="nav__avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
          alt=""
        />
      </div>
    </div>
  );
}

export default Nav;
