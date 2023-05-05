import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaFire, FaPoo } from "react-icons/fa";
import { IoMdSettings, IoMdPerson, IoIosToday, IoIosSchool, IoMdContrast, IoMdInformationCircle } from "react-icons/io"

const Navbar = () => {
    return (
        <div className="fixed top-0 h-full w-16 m-0 flex flex-col
                        bg-gray-900 text-white shadow-lg">
            
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


const NavbarIconAccount = ({ icon, text = "Account"}) => (
    <div className="navbar-icon group">
        {icon}

        <span className="navbar-text group-hover:scale-100">
            {text}
        </span>
    </div>
);

const NavbarIconBoard = ({ icon, text = "Dashboard"}) => (
    <div className="navbar-icon group">
        {icon}

        <span className="navbar-text group-hover:scale-100">
            {text}
        </span>
    </div>
);

const NavbarIconUse = ({ icon, text = "How to use"}) => (
    <div className="navbar-icon group">
        {icon}

        <span className="navbar-text group-hover:scale-100">
            {text}
        </span>
    </div>
);

const NavbarIconImprint = ({ icon, text = "Imprint"}) => (
    <div className="navbar-icon group">
        {icon}

        <span className="navbar-text group-hover:scale-100">
            {text}
        </span>
    </div>
);

const NavbarIconDark = ({ icon, text = "Switch Mode"}) => (
    <div className="navbar-icon group">
        {icon}

        <span className="navbar-text group-hover:scale-100">
            {text}
        </span>
    </div>
);

const NavbarIconSettings = ({ icon, text = "Settings"}) => (
    <div className="navbar-icon-bottom group">
        {icon}

        <span className="navbar-text group-hover:scale-100">
            {text}
        </span>
    </div>
);


const Divider = () => <hr className="navbar-hr" />;

export default Navbar;