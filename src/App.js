import React, { useEffect } from 'react';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
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
        console.log(userAuth);
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      } else {
        dispatch(logout());
      }
    })
  }, [dispatch])

  return (
    <Router>
        <Routes>
          <Route exact path='/' element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
          }/>
          <Route path="/landing" element={
            !user 
            ? <Landing/>
            : <Navigate to='/' replace/>
          } />
          <Route path='/home' element={<HomePage/>}/>
        </Routes>
    </Router>
  );
}

export default App;

/**
 * 
 <>
        <Routes>
          {
            !user ? (
              <Route path='/' element={<Landing/>}/>
            ) : (
              <>
                <Route path='/home' element={<HomePage/>}/>
                <Route path='/profile' element={<Profile/>}/>
              </>
            )
          }
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </>
 * 
 */