import DarkMode_switch from "../buttons/DarkMode_switch";
import Back_landing from "../buttons/Back_landing";

const Navbar_settings = () => {
    return (
        <div className="fixed top-0 h-full w-16 m-0 flex flex-col text-white z-50">
            
            <Back_landing />
            <DarkMode_switch />
        </div>
    );
};

const Divider = () => <hr className="navbar-hr" />;

export default Navbar_settings;