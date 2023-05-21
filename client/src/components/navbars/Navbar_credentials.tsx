import DarkMode_switch from "../buttons/DarkMode_switch";
import Back_landing from "../buttons/Back_landing";
import Imprint from "../buttons/Imprint";

const Navbar_credentials = () => {
    return (
        <div className="fixed top-0 h-full w-16 m-0 flex flex-col opacity-100 text-white z-50">
            
            <Back_landing />
            <DarkMode_switch />
            <Imprint />
        </div>
    );
};

export default Navbar_credentials;