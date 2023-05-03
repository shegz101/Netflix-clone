import { useState } from "react";
import "../styles/Card.css";
//importing things needed to query the data base
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice.js";
import {
  trail,
  movieId,
  mname,
  mdescp,
  mdate,
  mlang,
} from "../features/authSlice.js";
import { arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";
import movieTrailer from "movie-trailer";

const Card = ({ movie }) => {
  const [add, setAdd] = useState(false);
  const [trailerId, setTrailerId] = useState("");
  const [trailersaved, setTrailerSaved] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const img_url = `https://image.tmdb.org/t/p/original`;

  const user = useSelector(selectUser);

  const movieID = doc(db, "movies", `${user?.email}`);

  //create a function that handles and controls saving a trailer to list
  const savedTrailers = async (movie) => {
    setAdd(!add);
    setTrailerSaved(true);
    await updateDoc(movieID, {
      savedTrailers: arrayUnion({
        id: movie.id,
        title: movie.title,
        coverart: movie.backdrop_path || movie.poster_path,
      }),
    });
  };

  // console.log(movie.id);

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
        <div onClick={() => savedTrailers(movie)}>
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
