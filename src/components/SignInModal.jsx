import React, { useState, useRef } from 'react';
import '../styles/SignInModal.css';
import { auth } from '../firebase';
const SignInModal = () => {
    const [isusernew, setIsUserNew] = useState(false);
    const emailRef = useRef(null);
    const nameRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (e) => {
        e.preventDefault();
    }
    return ( 
        <div className='signup'>
            {
                isusernew ? (
                    <div className='signup__modal'>
                        <h1>Sign Up</h1>
                        <div className='btn__grp'>
                            <input type='text' ref={nameRef} placeholder='Fullname' required/>
                            <input type='email' ref={emailRef} placeholder="Email Address" required/>
                            <input type='password'ref={passwordRef} placeholder='Password' required/>
                            <button className="sign__btn">Sign Up</button>
                        </div>
                        <p><span style={{color:'grey'}}> Already a User? </span> <span style={{cursor:'pointer',}} onClick={() => {setIsUserNew(false)}}>Sign In.</span></p>
                   </div>
                ) : (
                    <div className='signin__modal'>
                        <h1>Sign In</h1>
                        <div className='btn__grp'>
                            <input type='email' placeholder="Email Address" required/>
                            <input type='password' placeholder='Password' required/>
                            <button className="sign__btn">Sign In</button>
                        </div>
                        <p><span style={{color:'grey'}}> New to Netflix? </span> <span style={{cursor:'pointer',}} onClick={() => {setIsUserNew(true)}}>Sign Up now.</span></p>
                   </div>
                )
            }
            
        </div>
    );
}
 
export default SignInModal;