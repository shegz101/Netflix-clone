import React, {useState,useEffect} from 'react';
// import Typewriter from "typewriter-effect";
// import { TbPlayerPlay } from 'react-icons/tb';
import '../styles/Banner.css';
import axios_fetch from '../api/axios_fetch';
import request_data from '../api/request_data';

const Banner = () => {
    const [bannermovie, setBannerMovie] = useState([]);
    const fetch_movie = async () => {
        const resp = await axios_fetch.get(request_data.Trending);
        setBannerMovie(resp.data.results[Math.floor(Math.random() * resp.data.results.length - 1)]);
    }

    const truncate = (string) => {
        if(string?.length > 100) {
            return string.slice(0, 100) + ' ...';
        }
    }

    // console.log(bannermovie);
    useEffect(() => {
        fetch_movie();

        return () => fetch_movie();
    },[])

    // const title = bannermovie?.title || bannermovie?.name || bannermovie?.original_name;
    // const overview = bannermovie?.overview;
    
    return (
        <header className="banner__image" style={{backgroundSize: 'cover', 
            backgroundImage: `url('https://image.tmdb.org/t/p/original/${bannermovie?.backdrop_path || bannermovie?.poster_path}')`,
            backgroundPosition: "center center",
            }}>
            
            <div className="banner-contents">
                {/* <Typewriter 
                    onInit={(typewriter)=> {
                    typewriter.typeString(`<h1 className='movie__name'>${title}</h1>`).stop().start();
                }}/> */}
                <h1 className='movie__name'>{bannermovie?.title || bannermovie?.name || bannermovie?.original_name}</h1>
                <div className="buttons">
                    <button className='button__play'>Play</button>
                    <button className='button__add'>Add to List</button>
                </div>
                {/* <Typewriter 
                    onInit={(typewriter)=> {
                    typewriter.typeString(`<p className='movie__description'>${overview}</p>`).stop().start();
                }}/> */}
                <p className='movie__description'>{truncate(bannermovie?.overview)}</p>
            </div>

            <div className="invisible__div"/>
        </header>
    )
}

export default Banner;

//<TbPlayerPlay style={{paddingRight:'10px', paddingTop:'2px'}}/>