import React, { useState } from "react";
import "../styles/MovieShow.css";
import YouTube from "react-youtube";
import axios_fetch from "../api/axios_fetch";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectId,
  selectName,
  selectDescription,
  selectDate,
  selectLang,
} from "../features/authSlice.js";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const MovieShow = () => {
  const movie_title = useSelector(selectName);
  const movie_overview = useSelector(selectDescription);
  const movie_date = useSelector(selectDate);
  const movie_lang = useSelector(selectLang);
  const [similarResponse, setSimilarResponse] = useState([]);
  const navigate = useNavigate();
  const id_tr = useSelector(selectId) || "1WJJVupoWvA";
  const API_KEY = "51e3d67cbe329bdeb9071d6ccdc4eb6f";
  const url = `/movie/${id_tr}/similar?api_key=${API_KEY}&language=en-US&page=1`;

  const fetch_similar = async () => {
    const resp = await axios_fetch.get(`${url}`);
    setSimilarResponse(resp.data);
    console.log(similarResponse);
  };

  fetch_similar();

  const options = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  // useEffect(() => {
  //   fetch_similar();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <div className="movie_show">
        <div className="movie_show_btn">
          <div className="navigate_icon" onClick={() => navigate(-1)}>
            <MdOutlineArrowBackIosNew
              style={{ color: "white" }}
              className="nav__icon"
            />
          </div>
          <div>
            <button className="add__list">Add</button>
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
        <p className="movie__date">Release Date: {movie_date}</p>
        <p className="movie__date">Language: {movie_lang}</p>
      </div>

      <div className="add_movie">
        <p>
          <MdAdd style={{ color: "white" }} className="add_icon" />
        </p>
        <p>Add to List</p>
      </div>

      <div className="related_video">
        <h2 style={{ color: "white" }}>Related Videos</h2>
      </div>
    </>
  );
};

export default MovieShow;

//"2g811Eo7K8U"
