import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaFire, FaPoo } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className="fixed top-0 h-screen w-16 m-0 flex flex-col
                        bg-gray-900 text-white shadow-lg">
            
            <NavbarIcon icon={<FaFire size="28" />} />
            <NavbarIcon icon={<BsPlus size="32" />} />
            <NavbarIcon icon={<BsFillLightningFill size="20" />} />
            <NavbarIcon icon={<FaPoo size="20" />} />
        </div>
    );
};


const NavbarIcon = ({ icon, text = "Webseiten Name" }) => (
    <div className="navbar-icon group">
        {icon}

        <span className="navbar-text group-hover:scale-100">
            {text}
        </span>
    </div>
);

export default Navbar;