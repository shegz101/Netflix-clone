import React from 'react';
import '../styles/PlayMore.css';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import {MdOutlineArrowBackIosNew} from 'react-icons/md';

const PlayMore = () => {
    const navigate = useNavigate();
    return (
        <div className='playmore__section'>
            <div className='player__wrapper'>
                <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                width='100%'
                height='100%'
                playing={true}
                controls={true}
                />
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