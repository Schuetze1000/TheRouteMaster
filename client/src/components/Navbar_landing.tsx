import DarkMode_switch from "./DarkMode_switch";

const Navbar_landing = () => {
    return (
        <div className="fixed top-0 h-full w-16 m-0 flex flex-col opacity-100 text-white z-50">
            
            <DarkMode_switch />
        </div>
    );
};

export default Navbar_landing;