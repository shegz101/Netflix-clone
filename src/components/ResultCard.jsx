import React from 'react';
import '../styles/search.css';
import {FaPlayCircle} from "react-icons/fa"

const ResultCard = ({ result }) => {
    const img_url = `https://image.tmdb.org/t/p/original`;
    return (
        <div className="movie">
            <div>
                <p>{result.release_date}</p>
            </div>

            <div>
                <img src={`${img_url}/${result.backdrop_path || result.poster_path}` !== null ? `${img_url}/${result.backdrop_path || result.poster_path}` : `https://via.placeholder.com/400`} alt={result?.name}/>
            </div>

            <div>
                <span><FaPlayCircle style={{width:'35px', height:'35px'}}/></span>
            </div>

            <div>
                <h3>{result.title}</h3>
            </div>
        </div>
    )
}

export default ResultCard;