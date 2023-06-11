import DarkMode_switch from "./buttons/btn_DarkModeSwitch";
import Dashboard from "./buttons/btn_Dashboard";
import Logout from "./buttons/btn_Logout";
import ChangeLng from "./buttons/btn_changeLng";

const Navbar_settings = () => {
    return (
        <div className="fixed top-0 h-full w-16 m-0 flex flex-col text-white z-50">
            
            <DarkMode_switch />
            <ChangeLng />
            <Divider />
            <Dashboard />
            <Divider />
            <Logout />
        </div>
    );
};

const Divider = () => <hr className="navbar-hr" />;

export default Navbar_settings;