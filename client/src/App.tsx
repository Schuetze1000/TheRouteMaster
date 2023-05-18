import Login from './pages/login/login';
import Landing from './pages/landing/landing';
import Dashboard from './pages/dashboard/dashboard';
import HowToUse from './pages/howToUse/howToUse';
import Imprint from './pages/imprint/imprint';
import Settings from './pages/settings/settings';
import Account from './pages/account/account';
import Registration from './pages/registration/registration';
import Calendar from './components/calendar';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


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
        <Route path="/account" element={<Account />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );  
}

export default App;