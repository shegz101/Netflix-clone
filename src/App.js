import React from 'react';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='home' element={<HomePage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
