import React from 'react';
import Login from './pages/login/login';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );  
}

export default App;