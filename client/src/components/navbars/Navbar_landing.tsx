import DarkMode_switch from "./buttons/btn_DarkModeSwitch";
import Dashboard from "./buttons/btn_Dashboard";
import HowToUse from "./buttons/btn_HowToUse";
import Imprint from "./buttons/btn_Imprint";
import { isLoggedIn } from "axios-jwt";
import Settings from "./buttons/btn_settings";
import Logout from "./buttons/btn_Logout";

const Navbar_landing = () => {
    return (
        <div className="fixed top-0 h-full w-16 m-0 flex flex-col opacity-100 text-white z-50">
            
            <DarkMode_switch />
            <DividerLoggedIn />
            <HowToUse />
            <Imprint />
            <Dashboard />
            <DividerLoggedIn />
            <Logout />
            <Settings />
        </div>
    );
};

const DividerLoggedIn = () => <hr className="navbar-hr" style={{visibility: isLoggedIn() ? "visible" : "hidden"}}/>;

export default Navbar_landing;