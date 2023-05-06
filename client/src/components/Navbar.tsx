import { IoMdSettings, IoMdPerson, IoIosToday, IoIosSchool, IoMdContrast, IoMdInformationCircle } from "react-icons/io"
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "usehooks-ts";

const Navbar = () => {
    return (
        <div className="fixed top-0 h-full w-16 m-0 flex flex-col
                        bg-theme-1-3 text-white shadow-lg">
            
            <NavbarIconAccount icon={<IoMdPerson size="28" />} />
            <Divider/>
            <NavbarIconBoard icon={<IoIosToday size="28" />} />
            <NavbarIconUse icon={<IoIosSchool size="28" />} />
            <NavbarIconImprint icon={<IoMdInformationCircle size="28" />} />
            <Divider/>
            <NavbarIconDark icon={<IoMdContrast size="28" />} />
            <NavbarIconSettings icon={<IoMdSettings size="28" />} />
        </div>
    );
};

const NavbarIconAccount = ({ icon, text = "Account" }) => {
    const navigate = useNavigate();
    const handleClickAccount = () => navigate("/account");

    return (
        <div className="navbar-icon group" onClick={handleClickAccount}>
            {icon}

            <span className="navbar-text group-hover:scale-100">
                {text}
            </span>
        </div>
    );
};

const NavbarIconBoard = ({ icon, text = "Dashboard" }) => {
    const navigate = useNavigate();
    const handleClickAccount = () => navigate("/dashboard");

    return (
        <div className="navbar-icon group" onClick={handleClickAccount}>
            {icon}

            <span className="navbar-text group-hover:scale-100">
                {text}
            </span>
        </div>
    );
};

const NavbarIconUse = ({ icon, text = "How to use" }) => {
    const navigate = useNavigate();
    const handleClickAccount = () => navigate("/howtouse");

    return (
        <div className="navbar-icon group" onClick={handleClickAccount}>
            {icon}

            <span className="navbar-text group-hover:scale-100">
                {text}
            </span>
        </div>
    );
};

const NavbarIconImprint = ({ icon, text = "Imprint" }) => {
    const navigate = useNavigate();
    const handleClickAccount = () => navigate("/imprint");

    return (
        <div className="navbar-icon group" onClick={handleClickAccount}>
            {icon}

            <span className="navbar-text group-hover:scale-100">
                {text}
            </span>
        </div>
    );
};

const NavbarIconDark = ({ icon, text = "Switch Mode" }) => {
    const { isDarkMode, toggle, enable, disable } = useDarkMode()

    return (
        <div className="navbar-icon group" onClick={toggle}>
            {icon}
            <p>Current theme: {isDarkMode ? 'dark' : 'light'}</p>

            <span className="navbar-text group-hover:scale-100">
                {text}
            </span>
        </div>
    );
};

const NavbarIconSettings = ({ icon, text = "Settings" }) => {
    const navigate = useNavigate();
    const handleClickAccount = () => navigate("/settings");

    return (
        <div className="navbar-icon-bottom group" onClick={handleClickAccount}>
            {icon}

            <span className="navbar-text group-hover:scale-100">
                {text}
            </span>
        </div>
    );
};


const Divider = () => <hr className="navbar-hr" />;

export default Navbar;