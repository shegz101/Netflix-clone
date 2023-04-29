import React, { useState } from "react";
import "../styles/SignInModal.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
//Import from firebase/firestore
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
//Using React Toastify to handle notifications
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInModal = () => {
  const [isusernew, setIsUserNew] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showpassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        toast.error("Passwords does not match");
      }
    }
    return isValid;
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (validatePassword()) {
      // Create a new user with email and password using firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
          console.log(authUser);
          //set the trailer add list array to empty as soon as a user signs up
          //Whenever we sign up, we create a user and email inside of the firestore database
          setDoc(doc(db, "users", email), {
            savedTrailers: [],
          });
          addDoc(collection(db, "users"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815,
          });
          navigate("/profile");
        })
        .catch((err) => toast.error(err.message));
      addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      localStorage.setItem("name", JSON.stringify(name));
      toast.success(`👋 Welcome onboard ${name}!`);
    }
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (!auth.user) {
          console.log("Please sign Up");
          toast.info("👋 Please Sign Up");
        } else {
          navigate("/home");
          toast.success("Signed In Successfully");
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const handlePassword = () => {
    setShowPassword(!showpassword);
  };

  return (
    <div className="signup">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {isusernew ? (
        <div className="signup__modal">
          <h1>Sign Up</h1>
          <div className="btn__grp">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your FullName"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
            <div className="password-type">
              <input
                type={showpassword ? `text` : `password`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button onClick={handlePassword}>
                {showpassword ? (
                  <AiFillEyeInvisible className="password__icon" />
                ) : (
                  <AiFillEye className="password__icon" />
                )}
              </button>
            </div>
            <div className="password-type">
              <input
                type={showpassword ? `text` : `password`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="ConfIrm Password"
                required
              />
              <button onClick={handlePassword}>
                {showpassword ? (
                  <AiFillEyeInvisible className="password__icon" />
                ) : (
                  <AiFillEye className="password__icon" />
                )}
              </button>
            </div>
            <button className="sign__btn" onClick={signUp}>
              Sign Up
            </button>
          </div>
          <p>
            <span style={{ color: "grey" }}> Already a User? </span>{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIsUserNew(false);
              }}
            >
              Sign In.
            </span>
          </p>
        </div>
      ) : (
        <div className="signin__modal">
          <h1>Sign In</h1>
          <div className="btn__grp">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="password-type">
              <input
                type={showpassword ? `text` : `password`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button onClick={handlePassword}>
                {showpassword ? (
                  <AiFillEyeInvisible className="password__icon" />
                ) : (
                  <AiFillEye className="password__icon" />
                )}
              </button>
            </div>
            <button className="sign__btn" onClick={signIn}>
              Sign In
            </button>
          </div>
          <p>
            <span style={{ color: "grey" }}> New to Trailflix? </span>{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIsUserNew(true);
              }}
            >
              Sign Up now.
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignInModal;

//<AiOutlineEye/>
