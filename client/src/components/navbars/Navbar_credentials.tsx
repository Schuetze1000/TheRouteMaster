import DarkMode_switch from "../buttons/DarkMode_switch";
import Back_landing from "../buttons/Back_landing";
import Imprint from "../buttons/Imprint";
import HowToUse from "../buttons/HowToUse";

const Navbar_credentials = () => {
    return (
        <div className="fixed top-0 h-full w-16 m-0 flex flex-col opacity-100 text-white z-50">
            
            <Back_landing />
            <Divider />
            <DarkMode_switch />
            <HowToUse />
            <Imprint />
        </div>
    );
};

const Divider = () => <hr className="navbar-hr" />;

export default Navbar_credentials;