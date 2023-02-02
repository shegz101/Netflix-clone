import React, { useState } from 'react';
import '../styles/search.css';
import {FaPlayCircle} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import movieTrailer from "movie-trailer";

const ResultCard = ({ result }) => {
    const img_url = `https://image.tmdb.org/t/p/original`;
    const navigate = useNavigate();
    const [trailersId, setrailersId] = useState('');

    const handleResultModal = (movie) => {
        if (trailersId) {
            setrailersId('');
        } else {
            movieTrailer(movie?.name || movie.title || movie?.original_name || "").then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setrailersId(urlParams.get("v"));
            }).catch((err) => console.log(err));
        }
        navigate('/playmore');
    };

    return (
        <div className="movie">
            <div>
                <p>{result.release_date}</p>
            </div>

            <div>
                <img src={`${img_url}/${result.backdrop_path || result.poster_path}` !== null ? `${img_url}/${result.backdrop_path || result.poster_path}` : (`https://via.placeholder.com/400`)} alt={result?.name}/>
            </div>

            <div>
                <span onClick={() => handleResultModal(result)}><FaPlayCircle style={{width:'35px', height:'35px', color:'#e50914'}}/></span>
            </div>

            <div>
                <h3>{result.title}</h3>
            </div>
        </div>
    )
}

export default ResultCard;