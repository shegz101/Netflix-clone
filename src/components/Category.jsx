import React, { useEffect, useState } from "react";
import axios_fetch from "../api/axios_fetch";
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
import "../styles/Category.css";

const Category = ({ heading, url }) => {
  const img_url = `https://image.tmdb.org/t/p/original`;
  const [moviecategory, setMovieCategory] = useState([]);
  const [trailerId, setTrailerId] = useState("");
  const [addtolist, setAddToList] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetch_movie_category = async () => {
    const resp = await axios_fetch.get(`${url}`);
    setMovieCategory(resp.data.results);
    // console.log(resp.data.results);
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
          dispatch(mlang(movie?.original_language));
        })
        .catch((err) => console.log(err));
    }
    navigate("/movieshow");
  };

  useEffect(() => {
    fetch_movie_category();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="category-section">
      <p
        className="heading-info"
        style={{ color: "white", paddingLeft: "10px" }}
      >
        {heading}
      </p>
      <div className="image-crop">
        {moviecategory.map((movie) => (
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
            <div className="add_trailer">
              <p>
                {addtolist ? (
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
                ) : (
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
                )}
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
              {movie?.title || movie?.name || movie?.original_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
