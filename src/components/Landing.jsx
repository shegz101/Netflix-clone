import React from 'react';
import pic from '../images/trailflix.png';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';

const Landing = () => {
    return (
        <div className='landing__section'>
            <div className="landing__header">
                <img className='landing__logo' src={pic} alt="Landing logo"/>
                <button className='sign_btn'>Sign In</button>
                {/* <div className='invisible__imaage__dark'/> */}
            </div>
            <div className="landing__text">
               <h1 className='header__info'>Unlimited films, TV programmes and more.</h1>
               <p className='description__info'>Watch anywhere. Cancel at any time.</p>
               <p className='membership__info'>Ready to watch? Enter your email to create or restart your membership.</p>
               <div className='input__button'>
                 <input type='text' placeholder='Email Address' className="input__field"/>
                 <Link to='/home' style={{textDecoration:'none'}}><button className="btn__field">GET STARTED</button></Link>
               </div>
            </div>
        </div>
    )
}

export default Landing;