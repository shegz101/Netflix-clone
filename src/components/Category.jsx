import React, {useEffect, useState} from "react";
import axios_fetch from '../api/axios_fetch';
import '../styles/Category.css'

const Category =({ heading, url }) => {
    const img_url = `https://image.tmdb.org/t/p/original`;
    const [moviecategory, setMovieCategory] = useState([]);
    const fetch_movie_category = async () => {
        const resp = await axios_fetch.get(`${url}`);
        setMovieCategory(resp.data.results);
    }
    console.log(moviecategory);
    useEffect(() => {
        fetch_movie_category();
    },[])
    return (
        <div className="category-section">
            <p className="heading-info" style={{color:'white', paddingLeft:'10px',}}>{heading}</p>
            <div className="image-crop">
            {
                moviecategory.map((movie) => (
                    <div className="movie__div">
                      <img clasName="movie__poster" style={{height: '130px', padding:'0 10px', borderRadius: '13px', }} src={`${img_url}/${movie.backdrop_path || movie.poster_path}`} alt="img post"/>
                      <p style={{color:'white', paddingTop:'10px'}}>{movie.title || movie?.name || movie?.original_name}</p>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default Category;