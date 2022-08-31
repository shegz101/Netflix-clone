import React from 'react';
import '../styles/SignInModal.css';
const SignInModal = () => {
    return ( 
        <div className='signup'>
            <div className='signin__modal'>
                <h1>Sign In</h1>
                <div className='btn__grp'>
                    <input type='email' placeholder="Email Address" className="email__input"/>
                    <input type='password' placeholder='Password' className="password__input"/>
                    <button className="sign__btn">Sign In</button>
                </div>
                <p><span style={{color:'grey'}}> New to Netflix? </span> Sign Up now.</p>
            </div>
        </div>
    );
}
 
export default SignInModal;