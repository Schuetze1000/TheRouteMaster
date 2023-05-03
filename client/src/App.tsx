import React from 'react';
import Login from './pages/login/login';
import Landing from './pages/landing/landing';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//function App() {
  //return (
  const App = () => (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} >
          <Route exact path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );  
//}

export default App;