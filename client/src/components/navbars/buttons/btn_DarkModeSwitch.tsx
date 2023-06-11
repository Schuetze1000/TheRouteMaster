import useColorMode from "../../../hooks/useColorMode";
import { useTranslation } from "react-i18next";

const DarkMode_switch = () => {

    return (
        <div>
            <DarkMode />
        </div>
    );
};

const DarkMode: React.FC<{ text?: string }> = ({ text }) => {
    const [colorMode, setColorMode] = useColorMode();
    const { t } = useTranslation();
    text = text || t('changeMode') || 'Fehler beim Laden der Sprache';

    return (
        <div className="landing-icon group" onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}>
            <svg className="h-8 w-8 text-white dark:text-black hover:text-black dark:hover:text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="1" />  <circle cx="12" cy="12" r="5" />  <circle cx="12" cy="12" r="9" stroke-dasharray=".001 4.03" /></svg>

            <span className="navbar-text group-hover:scale-100 z-50">
                {text}
            </span>
        </div>
    );
};

export default DarkMode_switch;