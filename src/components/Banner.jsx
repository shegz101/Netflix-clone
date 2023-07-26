import React, { useState, useEffect } from "react";
import movieTrailer from "movie-trailer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/authSlice.js";
import {
  trail,
  movieId,
  mname,
  mdescp,
  mdate,
  mlang,
} from "../features/authSlice.js";
import "../styles/Banner.css";
import axios_fetch from "../api/axios_fetch";
import request_data from "../api/request_data";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const Banner = () => {
  const [bannermovie, setBannerMovie] = useState([]);
  const [trailerId, setTrailerId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const fetch_movie = async () => {
    const resp = await axios_fetch.get(request_data.Trending);
    setBannerMovie(
      resp.data.results[
        Math.floor(Math.random() * resp.data.results.length - 1)
      ]
    );
  };

  const playTrailer = (movie) => {
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

  //function to reduce the length of movie description
  const truncate = (string) => {
    if (string?.length > 100) {
      return string.slice(0, 100) + " ...";
    }
  };

  useEffect(() => {
    fetch_movie();
  }, []);

  //Function to add and update the savedtrailers docs
  const updateUserSavedTrailers = async (movie) => {
    const userDocRef = doc(db, "users", `${user?.email}`);

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

  return (
    <header
      className="banner__image"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${
          bannermovie?.backdrop_path || bannermovie?.poster_path
        }')`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-contents">
        <h1 className="movie__name">
          {bannermovie?.title ||
            bannermovie?.name ||
            bannermovie?.original_name}
        </h1>
        <div className="buttons">
          <button
            className="button__play"
            onClick={() => playTrailer(bannermovie)}
          >
            Play
          </button>
          <button
            className="button__add"
            onClick={() => updateUserSavedTrailers(bannermovie)}
          >
            Add to List
          </button>
        </div>
        <p className="movie__description">{truncate(bannermovie?.overview)}</p>
      </div>

      <div className="invisible__div" />
    </header>
  );
};

export default Banner;
