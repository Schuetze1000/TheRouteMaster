import DarkMode_switch from "../buttons/DarkMode_switch";
import HowToUse from "../buttons/HowToUse";
import Dashboard from "../buttons/Dashboard";
import Imprint from "../buttons/Imprint";
import Account from "../buttons/Account";
import Settings from "../buttons/Settings";

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