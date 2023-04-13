import React, { useState } from "react";
import "../styles/search.css";
import errimg from "../images/400.png";
import { FaPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import movieTrailer from "movie-trailer";
import {
  trail,
  movieId,
  mname,
  mdescp,
  mdate,
  mlang,
} from "../features/authSlice.js";

const ResultCard = ({ result }) => {
  const img_url = `https://image.tmdb.org/t/p/original`;

  const navigate = useNavigate();
  const [trailersId, setTrailersId] = useState("");

  const dispatch = useDispatch();

  const handleResultModal = (trailer) => {
    if (trailersId) {
      setTrailersId("");
    } else {
      movieTrailer(
        trailer?.name || trailer?.title || trailer?.original_name || ""
      )
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          dispatch(trail(urlParams.get("v")));
          setTrailersId(urlParams.get("v"));
          dispatch(
            mname(
              trailer?.name || trailer?.title || trailer?.original_name || ""
            )
          );
          dispatch(movieId(trailer?.id));
          dispatch(mdescp(trailer?.overview));
          dispatch(mdate(trailer?.release_date));
          dispatch(mlang(trailer?.original_language));
        })
        .catch((err) => console.log(err));
    }
    navigate("/movieshow");
  };

  return (
    <div className="movie">
      <div>
        <p>{result.release_date}</p>
      </div>

      <div>
        <img
          src={
            `${img_url}/${result.backdrop_path || result.poster_path}` === null
              ? `${errimg}`
              : `${img_url}/${result.backdrop_path || result.poster_path}`
          }
          alt={result?.name}
        />
      </div>

      <div>
        <span onClick={() => handleResultModal(result)}>
          <FaPlayCircle
            style={{ width: "35px", height: "35px", color: "#e50914" }}
          />
        </span>
      </div>

      <div>
        <h3>{result.title}</h3>
      </div>
    </div>
  );
};

export default ResultCard;
