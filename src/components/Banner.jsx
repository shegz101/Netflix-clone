import React from 'react';
import '../styles/Banner.css';

const Banner = () => {
    return (
        <header className="banner__image" style={{backgroundSize: 'cover', 
            backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8XCntNXZ45CX1H7I1368CI0ckJJmfQDIl2A&usqp=CAU')`,
            backgroundPosition: "center center",
            }}>
            
            <div className="banner-contents">
                <h1 className='movie__name'>Movie Name</h1>
                <div className="buttons">
                    <button className='button__play'>Play</button>
                    <button className='button__add'>Add to List</button>
                </div>
                <p className='movie__description'>This is an interesting movie. 
                This is an interesting movie. This is an interesting movie. This is an interesting movie.
                This is an interesting movie.This is an interesting movie.This is an interesting movie.n
                </p>
            </div>
        </header>
    )
}

export default Banner;