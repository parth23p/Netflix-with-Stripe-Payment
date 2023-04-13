import React, { useEffect } from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import { auth } from "./Firebase";
import { useDispatch, useSelector } from "react-redux";

import { login, logout, selectUser } from "./features/counter/userSlice";
import ProfileScreen from "./screens/ProfileScreen";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      // it keeps track of auth state of the current user
      if (userAuth) {
        //logged in
        // console.log("userauth,app", userAuth);
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        // logged out
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="*" element={<LoginScreen />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
