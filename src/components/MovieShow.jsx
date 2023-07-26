import React, { useState } from "react";
import "../styles/MovieShow.css";
import YouTube from "react-youtube";
import axios_fetch from "../api/axios_fetch";
import movieTrailer from "movie-trailer";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";
import { selectUser } from "../features/authSlice.js";
//Using React Toastify to handle notifications
import { toast, ToastContainer } from "react-toastify";
import {
  selectId,
  selectMid,
  selectName,
  selectDescription,
  selectDate,
  selectLang,
  selectCover,
  trail,
  movieId,
  mname,
  mdescp,
  mdate,
  mcover,
  mlang,
} from "../features/authSlice.js";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const MovieShow = () => {
  const movie_title = useSelector(selectName);
  const movie_overview = useSelector(selectDescription);
  const movie_date = useSelector(selectDate);
  const movie_lang = useSelector(selectLang);
  const movie_cover = useSelector(selectCover);
  const [similarResponse, setSimilarResponse] = useState([]);
  const [trailerId, setTrailerId] = useState("");
  const navigate = useNavigate();
  const img_url = `https://image.tmdb.org/t/p/original`;
  const id_tr = useSelector(selectId);
  const mov_id = useSelector(selectMid);
  const API_KEY = "51e3d67cbe329bdeb9071d6ccdc4eb6f";
  const url = `/movie/${mov_id}/similar?api_key=${API_KEY}&language=en-US&page=1`;

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const fetch_similar = async () => {
    const resp = await axios_fetch.get(`${url}`);
    setSimilarResponse(resp.data.results);
  };

  fetch_similar();

  //This function will help us dispatch the current trailer ID and
  //relaod this page with the current infos.
  const handleSimilarTrailers = (trailer) => {
    if (trailerId) {
      setTrailerId("");
    } else {
      movieTrailer(
        trailer?.name || trailer?.title || trailer?.original_name || ""
      )
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          dispatch(trail(urlParams.get("v")));
          setTrailerId(urlParams.get("v"));
          dispatch(
            mname(
              trailer?.name || trailer?.title || trailer?.original_name || ""
            )
          );
          dispatch(movieId(trailer?.id));
          dispatch(mdescp(trailer?.overview));
          dispatch(mdate(trailer?.release_date));
          dispatch(mcover(trailer?.backdrop_path || trailer?.poster_path));
          dispatch(mlang(trailer?.original_language));
        })
        .catch((err) => console.log(err));
    }
    navigate("/movieshow");
  };

  const options = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  //Function to add and update the savedtrailers docs
  const updateUserSavedTrailers = async () => {
    const userDocRef = doc(db, "users", `${user?.email}`);

    // Fetch the user document to check if the data already exists
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();

    // The movie data to be added
    const movieData = {
      id: mov_id,
      title: movie_title,
      coverart: movie_cover,
      release_date: movie_date,
      overview: movie_overview,
      language: movie_lang,
    };

    // Check if the movie data exists in the "savedTrailers" array
    const isMovieSaved = userData.savedTrailers.some(
      (trailer) => trailer.id === movieData.id
    );

    if (isMovieSaved) {
      // Data already exists in Firebase, show an alert or handle the case as needed
      toast.error("Movie data already saved!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // Data doesn't exist, add it to the "savedTrailers" array
      await updateDoc(userDocRef, {
        savedTrailers: arrayUnion(movieData),
      });
      toast.success(`ℹ Successfully added ${movie_title}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("Saved trailers updated successfully.");
    }
  };

  return (
    <>
      <div className="movie_show">
        <ToastContainer
          position="bottom-center"
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
        <div className="movie_show_btn">
          <div className="navigate_icon" onClick={() => navigate(-1)}>
            <MdOutlineArrowBackIosNew
              style={{ color: "white" }}
              className="nav__icon"
            />
          </div>
          <div>
            <button className="add__list" onClick={updateUserSavedTrailers}>
              Add
            </button>
          </div>
        </div>
        <div className="video_show">
          {id_tr ? (
            <YouTube videoId={id_tr} opts={options} />
          ) : (
            <YouTube videoId="1WJJVupoWvA" opts={options} />
          )}
        </div>
      </div>

      <div className="movie_info">
        <h1>{movie_title}</h1>
        <p className="movie__overview">{movie_overview}</p>
        <p className="movie__date">
          Release Date: <span style={{ color: "#e50914" }}>{movie_date}</span>
        </p>
        <p className="movie__date">Language: {movie_lang}</p>
      </div>

      <div className="add_movie" onClick={updateUserSavedTrailers}>
        <p>
          <MdAdd style={{ color: "white" }} className="add_icon" />
        </p>
        <p>Add to List</p>
      </div>

      <div className="related_video">
        <div>
          <h2 style={{ color: "white" }}>Related Trailers</h2>
        </div>
        <div className="similar__movies-nav">
          {/* Render the images */}
          {similarResponse.map((related) => (
            <div className="related_trailers">
              <img
                key={related?.id}
                onClick={() => handleSimilarTrailers(related)}
                className="trailer__poster"
                style={{
                  cursor: "pointer",
                  borderRadius: "13px",
                  objectFit: "cover",
                }}
                src={`${img_url}/${
                  related.backdrop_path || related.poster_path
                }`}
                alt={related?.name}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieShow;
