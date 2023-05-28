import Login from './pages/login/login';
import Landing from './pages/landing/landing';
import Dashboard from './pages/dashboard/dashboard';
import HowToUse from './pages/howToUse/howToUse';
import Imprint from './pages/imprint/imprint';
import Settings from './pages/settings/settings';
import Registration from './pages/registration/registration';
import Calendar from './components/calendar';
import Forgot_password from './pages/forgot_password/forgot_password';
import Map from './components/map/map';

import Location from './components/location';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/howtouse" element={<HowToUse />} />
        <Route path="/imprint" element={<Imprint />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/map" element={<Map />} />
        <Route path="/forgot-password" element={<Forgot_password />} />
        <Route path="/location" element={<Location />} />
      </Routes>
    </Router>
  );  
}

export default App;