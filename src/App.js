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
import { Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

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
        }))
      } else {
        dispatch(logout());
      }
    })
  }, [dispatch, user])

  return (
    <Router>
        <Routes>
          <Route exact path='/' element={
            !user 
            ? <Landing/>
            : <Navigate to='/profile' replace/>
          }/>
          <Route exact path='/profile' element={
              <PrivateRoute>
                <Profile/>
              </PrivateRoute>
          }/>
          <Route exact path='/home' element={<HomePage/>}/>
        </Routes>
    </Router>
  );
}

export default App;