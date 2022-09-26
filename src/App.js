import React, { useEffect } from 'react';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { login, logout, selectUser } from '../src/features/authSlice';
import Profile from './components/Profile';
import { Navigate } from 'react-router-dom';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      } else {
        dispatch(logout());
      }
    });
    // return signed;
  }, [dispatch])

  return (
    <Router>
        <Routes>
          <Route path='/profile' element={<Profile/>}/>
          <Route exact path='/' element={
            !user?.email ? <Landing/> : <Navigate to='/profile' replace/>
          }/>
          <Route path='/home' element={<HomePage/>}/>
        </Routes>
    </Router>
  );
}

export default App;