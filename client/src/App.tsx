import React from 'react';
import Login from './pages/login/login';
import LinkButton from './components/LinkButton'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <LinkButton to="/login">Go to Login</LinkButton>
      <Routes>
        <Route path="/">
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );  
}

export default App;