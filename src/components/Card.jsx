import { useState, useEffect } from "react";
import "../styles/Card.css";
//importing things needed to query the data base
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/authSlice.js";
//Using React Toastify to handle notifications
import { toast, ToastContainer } from "react-toastify";
import {
  trail,
  movieId,
  mname,
  mdescp,
  mdate,
  mcover,
  mlang,
} from "../features/authSlice.js";
import {
  arrayUnion,
  doc,
  updateDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import movieTrailer from "movie-trailer";

const Card = ({ movie }) => {
  const [add, setAdd] = useState(false);
  const [trailerId, setTrailerId] = useState("");
  //Trailers State Array
  const [trailers, setTrailers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const img_url = `https://image.tmdb.org/t/p/original`;

  const user = useSelector(selectUser);

  useEffect(() => {
    const docRef = doc(db, "users", `${user?.email}`);

    const unsubscribe = onSnapshot(docRef, (doc) => {
      setTrailers(doc.data()?.savedTrailers);
    });

    return () => unsubscribe(); // Cleanup the listener when the component is unmounted
  }, [user?.email]);

  //Function to update the savedtrailers docs
  const updateUserSavedTrailers = async () => {
    const userDocRef = doc(db, "users", `${user?.email}`);

    setAdd(!add);

    // Fetch the user document to check if the data already exists
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();

    // The movie data to be added
    const movieData = {
      id: movie.id,
      title: movie.title || movie.name || movie.original_name,
      coverart: movie.backdrop_path || movie.poster_path,
      release_date: movie.release_date,
      overview: movie.overview,
      language: movie.original_language,
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
      toast.success(
        `ℹ Successfully added ${
          movie.title || movie.name || movie.original_name
        }`,
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      console.log("Saved trailers updated successfully.");
    }
  };

  //delete trailer function
  const trailerRef = doc(db, "users", `${user?.email}`);

  const deleteTrailer = async (id) => {
    setAdd(!add);
    try {
      const updated_list = trailers.filter((movie) => movie.id !== id);
      await updateDoc(trailerRef, {
        savedTrailers: updated_list,
      });
    } catch (error) {
      console.log(error);
    }
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
              onClick={() => deleteTrailer(movie?.id)}
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
