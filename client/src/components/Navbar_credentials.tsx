import DarkMode_switch from "./DarkMode_switch";
import Back_landing from "./Back_landing";
import { useNavigate } from "react-router-dom";

const Navbar_credentials = () => {
    return (
        <div className="fixed top-0 h-full w-16 m-0 flex flex-col opacity-100 text-white z-50">
            
            <Back_landing />
            <DarkMode_switch />
            <NavbarImprint />
        </div>
    );
};

const NavbarImprint = () => {
    const navigate = useNavigate();
    const handleClickAccount = () => navigate("/imprint");

    return (
        <div className="landing-button group" onClick={handleClickAccount}>
            <svg className="h-8 w-8 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="5" y="3" width="14" height="18" rx="2" />  <line x1="9" y1="7" x2="15" y2="7" />  <line x1="9" y1="11" x2="15" y2="11" />  <line x1="9" y1="15" x2="13" y2="15" /></svg>
        </div>
    );
};

export default Navbar_credentials;