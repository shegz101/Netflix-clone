import React, { useState } from 'react';
import '../styles/SignInModal.css';
import {useNavigate} from 'react-router-dom';
import {auth} from '../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
// import {onAuthStateChanged} from 'firebase/auth';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../features/authSlice';
import { useDispatch } from 'react-redux';
import { updateTimeActive } from '../features/authSlice';

const SignInModal = () => {
    const [isusernew, setIsUserNew] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate()
    // const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const validatePassword = () => {
        let isValid = true
        if (password !== '' && confirmPassword !== ''){
          if (password !== confirmPassword) {
            isValid = false
            alert('Passwords does not match')
          }
        }
        return isValid
    }

    const signUp = (e) => {
        e.preventDefault()
        if(validatePassword()) {
          // Create a new user with email and password using firebase
            createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res.user)
              })
            .catch(err => alert(err.message))
        }
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    const signIn = e => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          if(!auth.user.emailVerified) {
            sendEmailVerification(auth.user)
            .then(() => {
              dispatch(updateTimeActive(true))
              navigate('/verify-email')
            })
          .catch(err => alert(err.message))
        }else{
          navigate('/')
        }
        })
        .catch(err => alert(err.message))
    }

    
    return ( 
        <div className='signup'>
            {
                isusernew ? (
                    <div className='signup__modal'>
                        <h1>Sign Up</h1>
                        <div className='btn__grp'>
                            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required/>
                            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required/>
                            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required/>
                            <input type='password'value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='ConfIrm Password' required/>
                            <button className="sign__btn" onClick={signUp}>Sign Up</button>
                        </div>
                        <p><span style={{color:'grey'}}> Already a User? </span> <span style={{cursor:'pointer',}} onClick={() => {setIsUserNew(false)}}>Sign In.</span></p>
                   </div>
                ) : (
                    <div className='signin__modal'>
                        <h1>Sign In</h1>
                        <div className='btn__grp'>
                            <input type='email' placeholder="Email Address" required/>
                            <input type='password' placeholder='Password' required/>
                            <button className="sign__btn" onClick={signIn}>Sign In</button>
                        </div>
                        <p><span style={{color:'grey'}}> New to Netflix? </span> <span style={{cursor:'pointer',}} onClick={() => {setIsUserNew(true)}}>Sign Up now.</span></p>
                   </div>
                )
            }
            
        </div>
    );
}
 
export default SignInModal;