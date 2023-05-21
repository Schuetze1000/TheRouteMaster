import DarkMode_switch from "../buttons/DarkMode_switch";
import HowToUse from "../buttons/HowToUse";
import Imprint from "../buttons/Imprint";

const Navbar_landing = () => {
    return (
        <div className="fixed top-0 h-full w-16 m-0 flex flex-col opacity-100 text-white z-50">
            
            <DarkMode_switch />
            <HowToUse />
            <Imprint />
        </div>
    );
};

export default Navbar_landing;