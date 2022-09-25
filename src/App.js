import React, { useEffect } from 'react';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
// import VerifyEmail from './components/VerifyEmail';
import {auth} from './firebase';
import {onAuthStateChanged} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { login, logout, selectUser } from '../src/features/authSlice';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute'
import {Navigate} from 'react-router-dom';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        console.log(user);
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
          // emailVerified: userAuth.emailVerified
        }))
      } else {
        dispatch(logout());
      }
    })
  }, [dispatch, user])

  return (
    <Router>
        <Routes>
          <Route exact path='/profile' element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
          }/>
          <Route path="/" element={
            !user 
            ? <Landing/>
            : <Navigate to='/profile' replace/>
          }/>
          <Route path='/home' element={<HomePage/>}/>
          {/* <Route path='/verifyEmail' element={<VerifyEmail/>}/> */}
        </Routes>
    </Router>
  );
}

export default App;