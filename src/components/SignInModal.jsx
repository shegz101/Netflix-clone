import React, { useState } from 'react';
import '../styles/SignInModal.css';
const SignInModal = () => {
    const [isusernew, setIsUserNew] = useState(false);
    return ( 
        <div className='signup'>
            {
                isusernew ? (
                    <div className='signup__modal'>
                        <h1>Sign Up</h1>
                        <div className='btn__grp'>
                            <input type='text' placeholder='Fullname'/>
                            <input type='email' placeholder="Email Address" className="email__input"/>
                            <input type='password' placeholder='Password' className="password__input"/>
                            <button className="sign__btn">Sign Up</button>
                        </div>
                        <p><span style={{color:'grey'}}> Already a User? </span> <span style={{cursor:'pointer',}} onClick={() => {setIsUserNew(false)}}>Sign In.</span></p>
                   </div>
                ) : (
                    <div className='signin__modal'>
                        <h1>Sign In</h1>
                        <div className='btn__grp'>
                            <input type='email' placeholder="Email Address" className="email__input"/>
                            <input type='password' placeholder='Password' className="password__input"/>
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