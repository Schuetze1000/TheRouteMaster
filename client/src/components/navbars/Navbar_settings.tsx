import { IoMdSettings, IoMdPerson, IoIosToday, IoIosSchool, IoMdContrast, IoMdInformationCircle } from "react-icons/io"
import { useNavigate } from "react-router-dom";
import useColorMode from "../../hooks/useColorMode";
import DarkMode_switch from "../buttons/DarkMode_switch";
import Imprint from "../buttons/Imprint";
import Account from "../buttons/Account";
import Dashboard from "../buttons/Dashboard";
import HowToUse from "../buttons/HowToUse";

const Navbar_settings = () => {
    return (
        <div className="fixed top-0 h-full w-16 m-0 flex flex-col text-white z-50">
            
            <DarkMode_switch />
        </div>
    );
};

const Divider = () => <hr className="navbar-hr" />;

export default Navbar_settings;