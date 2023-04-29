import React, { useEffect } from "react";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login, logout, selectUser } from "../src/features/authSlice";
import Profile from "./components/Profile";
import { Navigate } from "react-router-dom";
import Search from "./components/Search";
import Land from "./components/Land";
import MovieShow from "./components/MovieShow";
import MyList from "components/MyList";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route
          exact
          path="/"
          element={!user ? <Land /> : <Navigate to="/profile" replace />}
        />
        <Route path="/home" element={<HomePage />} />
        <Route path="/list" element={<MyList />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movieshow" element={<MovieShow />} />
      </Routes>
    </Router>
  );
}

export default App;
