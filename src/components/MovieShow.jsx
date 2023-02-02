import React from "react";
import YouTube from 'react-youtube';
import { useSelector } from 'react-redux';
import { selectId } from '../features/authSlice.js';

const MovieShow = () => {
    const id_tr = useSelector(selectId);
    console.log('dIspatched-id', id_tr);

    const options = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    return (
        <div>
            {id_tr && <YouTube videoId={id_tr} opts={options}/>}
        </div>
    )
} 

export default MovieShow;

//"2g811Eo7K8U"