import React from 'react';
import '../styles/PlayMore.css';
// import ReactPlayer from 'react-player';
import YouTube from 'react-youtube';
import { useNavigate } from 'react-router-dom';
import {MdOutlineArrowBackIosNew} from 'react-icons/md';
import { selectId } from '../features/authSlice.js';
import { useSelector } from 'react-redux';


const PlayMore = () => {
    const navigate = useNavigate();
    const id_tr = useSelector(selectId);

    const options = {
        height: '100%',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            // autoplay: 1,
            color: '#e50914',
        },
    };
    return (
        <div className='playmore__section'>
            <div className='player__wrapper'>
                {
                   id_tr ? (
                    <YouTube videoId={id_tr} opts={options}/>
                   ) : (
                    <h1>Trailer For this MOvie not found</h1>
                   )
                }
                {/* <ReactPlayer url={url__youtube}
                width='100%'
                height='100%'
                playing={true}
                controls={true}
                /> */}
                <div className="go__back">
                    <div className='navigate-icon' onClick={() => navigate(-1)}>
                        <MdOutlineArrowBackIosNew style={{color:'white'}} className="nav-icon"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayMore;