import DarkMode_switch from "./buttons/btn_DarkModeSwitch";
import Back_landing from "./buttons/btn_BackLanding";
import Imprint from "./buttons/btn_Imprint";

const Navbar_use = () => {
    return (
        <div className="fixed top-0 h-full w-16 m-0 flex flex-col text-white z-50">
            
            <Back_landing />
            <Divider />
            <DarkMode_switch />
            <Imprint />
        </div>
    );
};

const Divider = () => <hr className="navbar-hr" />;

export default Navbar_use;