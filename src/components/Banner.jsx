import React, { useState, useEffect } from "react";
// import Typewriter from "typewriter-effect";
// import { TbPlayerPlay } from "react-icons/tb";
import movieTrailer from "movie-trailer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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

const Banner = () => {
  const [bannermovie, setBannerMovie] = useState([]);
  const [trailerId, setTrailerId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        {/* <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString(
                `<h1 className='movie__name'>${
                  bannermovie?.title ||
                  bannermovie?.name ||
                  bannermovie?.original_name
                }</h1>`
              )
              .stop()
              .start();
          }}
        /> */}
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
          <button className="button__add">Add to List</button>
        </div>
        <p className="movie__description">{truncate(bannermovie?.overview)}</p>
      </div>

      <div className="invisible__div" />
    </header>
  );
};

export default Banner;
