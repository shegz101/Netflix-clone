import React, {useEffect, useState} from "react";
import axios_fetch from '../api/axios_fetch';
import movieTrailer from "movie-trailer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { trail } from '../features/authSlice.js';
import YouTube from 'react-youtube';
import '../styles/Category.css';


const Category =({ heading, url }) => {
    const img_url = `https://image.tmdb.org/t/p/original`;
    const [moviecategory, setMovieCategory] = useState([]);
    const [trailerId, setTrailerId] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(`three ` + trailerId);
    dispatch(trail(trailerId));
    
    const fetch_movie_category = async () => {
        const resp = await axios_fetch.get(`${url}`);
        setMovieCategory(resp.data.results);
    }

    const options = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const handleMovieModal = (movie) => {
        if (trailerId) {
            setTrailerId('');
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.original_name || "").then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerId(urlParams.get("v"));
            }).catch((err) => console.log(err));
        }
    };


    const handleMovieId = (movie) => {
        if (trailerId) {
            setTrailerId("");
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.original_name || "").then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerId(urlParams.get("v"));
            }).catch((err) => console.log(err));
        }
        navigate('/movieshow');
    }

    useEffect(() => {
        fetch_movie_category();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="category-section">
            <p className="heading-info" style={{color:'white', paddingLeft:'10px', fontSize:'20px'}}>{heading}</p>
            <div className="image-crop">
                {
                    moviecategory.map((movie) => (
                        <div className="movie__div">
                            <img key={movie?.id} 
                            onClick={() => handleMovieModal(movie)}
                            onDoubleClick={() => handleMovieId(movie)}
                            className="movie__poster" style={{height: '210px', width:'160px', padding:'0 10px', cursor:'pointer', borderRadius: '13px', objectFit:'cover' }} 
                            src={`${img_url}/${movie.backdrop_path || movie.poster_path}`} alt={movie?.name}/>
                            <p style={{color:'white', paddingTop:'10px', paddingBottom:'10px',}}>{movie?.title || movie?.name || movie?.original_name}</p>
                        </div>
                    ))
                }
            </div>
            {trailerId && <YouTube videoId={trailerId} opts={options}/>}
        </div>
    )
}

export default Category;