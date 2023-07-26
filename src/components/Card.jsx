import { useState } from "react";
import "../styles/Card.css";
//importing things needed to query the data base
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/authSlice.js";
import {
  trail,
  movieId,
  mname,
  mdescp,
  mdate,
  mcover,
  mlang,
} from "../features/authSlice.js";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import movieTrailer from "movie-trailer";

const Card = ({ movie }) => {
  const [add, setAdd] = useState(false);
  const [trailerId, setTrailerId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const img_url = `https://image.tmdb.org/t/p/original`;

  const user = useSelector(selectUser);

  //Function to update the savedtrailers docs
  const updateUserSavedTrailers = async () => {
    const userDocRef = doc(db, "users", `${user?.email}`);

    setAdd(!add);

    await updateDoc(userDocRef, {
      savedTrailers: arrayUnion({
        id: movie.id,
        title: movie.title || movie.name || movie.original_name,
        coverart: movie.backdrop_path || movie.poster_path,
        release_date: movie.release_date,
        overview: movie.overview,
        language: movie.original_language,
      }),
    });

    console.log("Saved trailers updated successfully.");
  };

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
          dispatch(mcover(movie?.backdrop_path || movie?.poster_path));
          dispatch(mlang(movie?.original_language));
        })
        .catch((err) => console.log(err));
    }
    navigate("/movieshow");
  };

  return (
    <div className="movie__div">
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
        src={`${img_url}/${movie.backdrop_path || movie.poster_path}`}
        alt={movie?.name}
      />
      <div>
        <div onClick={updateUserSavedTrailers}>
          {add ? (
            <p
              style={{
                position: "absolute",
                top: 6,
                left: 20,
                cursor: "pointer",
                height: "50px",
                fontSize: "20px",
                color: "whitesmoke",
              }}
            >
              x
            </p>
          ) : (
            <p
              style={{
                position: "absolute",
                top: 6,
                left: 20,
                cursor: "pointer",
                height: "50px",
                fontSize: "20px",
                color: "white",
              }}
            >
              +
            </p>
          )}
        </div>
      </div>
      <p
        style={{
          color: "white",
          paddingTop: "10px",
          paddingBottom: "10px",
          fontSize: "12px",
        }}
      >
        {movie?.title || movie?.name || movie?.original_name}
      </p>
    </div>
  );
};

export default Card;
