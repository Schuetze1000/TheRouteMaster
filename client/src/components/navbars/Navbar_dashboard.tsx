import DarkModeSwitch from "./buttons/btn_DarkModeSwitch";
import HowToUse from "./buttons/btn_HowToUse";
import Imprint from "./buttons/btn_Imprint";
import Logout from "./buttons/btn_Logout";
import ChangeLng from "./buttons/btn_changeLng";
import Settings from "./buttons/btn_settings";

const Navbar_dashboard = () => {
    return (
        <div className="fixed top-0 h-full w-16 m-0 flex flex-col text-white z-50">
            
            <DarkModeSwitch />
            <ChangeLng />
            <Divider />
            <HowToUse />
            <Imprint />
            <Divider />
            <Logout />
            <Settings />
        </div>
    );
};


const Divider = () => <hr className="navbar-hr" />;

export default Navbar_dashboard;