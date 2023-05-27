import DarkMode_switch from "./buttons/btn_DarkModeSwitch";
import Back_landing from "./buttons/btn_BackLanding";
import HowToUse from "./buttons/btn_HowToUse";

const Navbar_imprint = () => {
    return (
        <div className="fixed top-0 h-full w-16 m-0 flex flex-col text-white z-50">
            
            <Back_landing />
            <Divider />
            <DarkMode_switch />
            <HowToUse />
        </div>
    );
};

const Divider = () => <hr className="navbar-hr" />;

export default Navbar_imprint;