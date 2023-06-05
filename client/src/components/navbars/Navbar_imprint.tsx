import DarkMode_switch from "./buttons/btn_DarkModeSwitch";
import Back_landing from "./buttons/btn_BackLanding";
import HowToUse from "./buttons/btn_HowToUse";
import { isLoggedIn } from "axios-jwt";
import Settings from "./buttons/btn_settings";
import Logout from "./buttons/btn_Logout";
import Dashboard from "./buttons/btn_Dashboard";

const Navbar_imprint = () => {
    return (
        <div className="fixed top-0 h-full w-16 m-0 flex flex-col text-white z-50">
            
            <Back_landing />
            <Divider />
            <DarkMode_switch />
            <HowToUse />
            <Dashboard />
            <DividerLoggedIn />
            <Logout />
            <Settings />
        </div>
    );
};

const Divider = () => <hr className="navbar-hr" />;
const DividerLoggedIn = () => <hr className="navbar-hr" style={{visibility: isLoggedIn() ? "visible" : "hidden"}}/>;

export default Navbar_imprint;