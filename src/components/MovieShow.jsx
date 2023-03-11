import React from "react";
import '../styles/MovieShow.css';
import YouTube from 'react-youtube';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectId } from '../features/authSlice.js';
import {MdOutlineArrowBackIosNew} from 'react-icons/md';

const MovieShow = () => {
    const id_tr = useSelector(selectId);
    console.log('dIspatched-id', id_tr);
    const navigate = useNavigate();

    const options = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    return (
        <div className="movie_show">
            <div className="movie_show_btn">
                <div className='navigate_icon' onClick={() => navigate(-1)}>
                    <MdOutlineArrowBackIosNew style={{color:'white'}} className="nav__icon"/>
                </div>
                <div>
                    <button className='add__list'>Add</button>
                </div>
            </div>
            <div className="video_show">
                {
                   id_tr ? (
                    <YouTube videoId={id_tr} opts={options}/>
                   ) : (
                    <YouTube videoId="1WJJVupoWvA" opts={options}/>
                   )
                }
            </div>
        </div>
    )
} 

export default MovieShow;

//"2g811Eo7K8U"