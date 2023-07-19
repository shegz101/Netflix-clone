import React from "react";
import "../styles/SavedList.css";

function SavedList() {
  return (
    <div className="savedlist-section">
      <p
        className="heading-info"
        style={{ color: "white", paddingLeft: "10px" }}
      >
        The List
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
              src={`${img_url}/${movie.coverart}`}
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
        ))}
      </div>
    </div>
  );
}

export default SavedList;
