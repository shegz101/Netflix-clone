import React, { useState, useEffect } from "react";
import "../styles/SavedList.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../features/authSlice.js";
import {
  trail,
  movieId,
  mname,
  mdescp,
  mdate,
  mlang,
} from "../features/authSlice.js";
import movieTrailer from "movie-trailer";
//importing things needed to query the data base
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";

const SavedList = () => {
  const [trailerId, setTrailerId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  //delete trailer function
  const trailerRef = doc(db, "users", `${user?.email}`);

  const deleteTrailer = async (id) => {
    try {
      const updated_list = trailers.filter((movie) => movie.id !== id);
      await updateDoc(trailerRef, {
        savedTrailers: updated_list,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //function to save retrieve trailer info in order to be able to play it
  const handleMovieId = (movie) => {
    if (trailerId) {
      setTrailerId("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          dispatch(trail(urlParams.get("v")));
          setTrailerId(urlParams.get("v"));
          dispatch(
            mname(movie?.name || movie?.title || movie?.original_name || "")
          );
          dispatch(movieId(movie?.id));
          dispatch(mdescp(movie?.overview));
          dispatch(mdate(movie?.release_date));
          dispatch(mlang(movie?.original_language));
        })
        .catch((err) => console.log(err));
    }
    navigate("/movieshow");
  };

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
              onClick={() => handleMovieId(movie)}
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
            <div onClick={() => deleteTrailer(movie.id)}>
              <p
                style={{
                  position: "absolute",
                  top: 6,
                  right: 30,
                  cursor: "pointer",
                  height: "50px",
                  fontSize: "20px",
                  color: "whitesmoke",
                }}
              >
                x
              </p>
            </div>
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
};

export default SavedList;
