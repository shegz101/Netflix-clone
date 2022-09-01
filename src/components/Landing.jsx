import React, { useState } from 'react';
import pic from '../images/trailflix.png';
import SignInModal from './SignInModal';
// import { Link } from 'react-router-dom';
import '../styles/Landing.css';

const Landing = () => {
    const [isuserin, setUserIn] = useState(true);
    return (
        <div className='landing__section'>
            <div className="landing__header">
                <img className='landing__logo' src={pic} alt="Landing logo"/>
                <button className='sign_btn' onClick={() => {setUserIn(false)}}>Sign In</button>
                <div className='invisible__imaage__dark'/>
            </div>
            <div className="landing__text">
                {
                    isuserin ? (
                        <div className='intro__div'>
                            <h1 className='header__info'>Unlimited films, TV programmes and more.</h1>
                            <p className='description__info'>Watch anywhere. Cancel at any time.</p>
                            <p className='membership__info'>Ready to watch? Enter your email to create or restart your membership.</p>
                            <div className='input__button'>
                                <input type='text' placeholder='Email Address' className="input__field" required/>
                                <button className="btn__field" onClick={() => {setUserIn(false)}}>GET STARTED</button>
                            </div>
                        </div>
                    ) : (
                        <SignInModal/>
                    )
                } 
            </div>
        </div>
    )
}

export default Landing;