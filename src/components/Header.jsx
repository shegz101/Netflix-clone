import React, { useState, useEffect } from "react";
import pic from "../images/trailflix.png";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Header.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Header = () => {
  const [showdark, setShowDark] = useState(false);
  const [showdrop, setShowDrop] = useState(false);
  //state to control link activeness
  const [activeLink, setActiveLink] = useState("home");
  const navigate = useNavigate();

  const controlBlackNav = () => {
    if (window.scrollY > 100) {
      setShowDark(true);
    } else {
      setShowDark(false);
    }
  };

  //function to set active link
  const handleNavClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlBlackNav);
    return () => {
      window.removeEventListener("scroll", controlBlackNav);
    };
  }, []);

  const showDropDown = () => {
    if (showdrop === true) {
      setShowDrop(false);
    } else {
      setShowDrop(true);
    }
  };

  //function to initiate log out
  const signedOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className={`header ${showdark && "bg__dark"}`}>
      <div className="header-image">
        <div className="header__start__name">
          <img
            className="header__logo"
            src={pic}
            alt="web-app-logo"
            onClick={() => navigate("/home")}
          />
          <nav className="nav-links" style={{ zIndex: "3" }}>
            <Link
              to="/home"
              style={{
                textDecoration: "none",
              }}
              onClick={() => handleNavClick("home")}
            >
              <li
                className={`navbar-link ${
                  activeLink === "home" ? "active" : ""
                }`}
                style={{
                  paddingLeft: "13px",
                }}
              >
                Home
              </li>
            </Link>
            <Link
              to="/list"
              style={{
                textDecoration: "none",
              }}
              onClick={() => handleNavClick("list")}
            >
              <li
                className={`navbar-link ${
                  activeLink === "list" ? "active" : ""
                }`}
                style={{
                  paddingLeft: "13px",
                }}
              >
                My List
              </li>
            </Link>
          </nav>
        </div>

        <div className="floated-right-nav">
          <nav className="nav-icon">
            <div>
              <div
                className="search__div"
                style={{ position: "fixed" }}
                onClick={() => navigate("/search")}
              >
                <AiOutlineSearch
                  className="search-icon"
                  style={{
                    color: "white",
                    fontWeight: "900",
                    fontSize: "20px",
                  }}
                />
              </div>
            </div>
            <div>
              <img
                className="avatar__logo"
                onClick={() => showDropDown(true)}
                style={{ paddingLeft: "20px", paddingTop: "20px" }}
                src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
                alt="avatar-default-icon"
              />
            </div>
          </nav>
          {showdrop && (
            <div className="more-nav">
              <li
                style={{
                  color: "white",
                  paddingBottom: "5px",
                  paddingLeft: "10px",
                  cursor: "pointer",
                }}
                onClick={signedOut}
              >
                Log Out
              </li>
              <li
                style={{
                  color: "white",
                  cursor: "pointer",
                  paddingBottom: "5px",
                  paddingLeft: "10px",
                }}
                onClick={() => navigate("/profile")}
              >
                Account
              </li>
              <li
                style={{
                  color: "white",
                  cursor: "pointer",
                  paddingBottom: "5px",
                  paddingLeft: "10px",
                }}
                onClick={() => navigate("/list")}
              >
                My list
              </li>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
