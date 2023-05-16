import useColorMode from "../hooks/useColorMode";
import { IoMdContrast } from "react-icons/io"

const DarkMode_switch = () => {
    const [colorMode, setColorMode] = useColorMode();

    return (
        <div>
            <IconDark icon={<IoMdContrast size="28" />} />
        </div>
    );
};

const IconDark = ({ icon }) => {
    const [colorMode, setColorMode] = useColorMode();

    return (
        <div className="landing-icon group" onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}>
            {icon}
        </div>
    );
};

export default DarkMode_switch;