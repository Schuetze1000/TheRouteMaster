import DarkMode_switch from "./buttons/btn_DarkModeSwitch";
import HowToUse from "./buttons/btn_HowToUse";
import Dashboard from "./buttons/btn_Dashboard";
import Imprint from "./buttons/btn_Imprint";
import Account from "./buttons/btn_Account";
import Settings from "./buttons/btn_settings";

const Navbar = () => {
    return (
        <div className="fixed top-0 h-full w-16 m-0 flex flex-col text-white z-50">
            
            <Account />
            <Divider />
            <Dashboard />
            <HowToUse />
            <Imprint />
            <Divider />
            <DarkMode_switch />
            <Divider />
            <Settings />
        </div>
    );
};


const Divider = () => <hr className="navbar-hr" />;

export default Navbar;