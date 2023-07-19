import React, { useState, useEffect } from "react";
import "../styles/SavedList.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice.js";
//importing things needed to query the data base
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";

function SavedList() {
  //Trailers State Array
  const [trailers, setTrailers] = useState([]);
  // The Image Url
  const img_url = `https://image.tmdb.org/t/p/original`;

  const user = useSelector(selectUser);

  useEffect(() => {
    const docRef = doc(db, "users", `${user?.email}`);

    const unsubscribe = onSnapshot(docRef, (doc) => {
      setTrailers(doc.data()?.savedTrailers);
    });

    return () => unsubscribe(); // Cleanup the listener when the component is unmounted
  }, [user?.email]);

  return (
    <div className="savedlist-section">
      <p
        className="heading-info"
        style={{ color: "white", paddingLeft: "10px" }}
      >
        The List
      </p>
      <div className="image-crop">
        {trailers.map((movie, id) => (
          <div className="movie__div" key={id}>
            <img
              key={movie?.id}
              className="movie__poster"
              style={{
                height: "210px",
                width: "160px",
                padding: "0 10px",
                cursor: "pointer",
                borderRadius: "13px",
                objectFit: "cover",
              }}
              src={`${img_url}/${movie.coverart}`}
              alt={movie.title}
            />

            <p
              style={{
                color: "white",
                paddingTop: "10px",
                paddingBottom: "10px",
                fontSize: "12px",
              }}
            >
              {movie?.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedList;
