import DarkMode_switch from "./DarkMode_switch";
import Back_landing from "./Back_landing";

const Navbar_credentials = () => {
    return (
        <div className="fixed top-0 h-full w-16 m-0 flex flex-col opacity-100 text-white z-50">
            
            <Back_landing />
            <DarkMode_switch />
        </div>
    );
};

export default Navbar_credentials;