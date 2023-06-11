import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HowToUse: React.FC<{ text?: string }> = ({ text }) => {
    const navigate = useNavigate();
    const handleClickAccount = () => navigate("/howtouse");
    const { t } = useTranslation();
    text = text || t('use_nav') || 'Fehler beim Laden der Sprache';

    return (
        <div className="landing-button group" onClick={handleClickAccount}>
            <svg className="h-8 w-8 text-white dark:text-black hover:text-black dark:hover:text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M3 12h1M12 3v1M20 12h1M5.6 5.6l.7 .7M18.4 5.6l-.7 .7" />  <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />  <line x1="9.7" y1="17" x2="14.3" y2="17" /></svg>

            <span className="navbar-text group-hover:scale-100 z-50">
                {text}
            </span>
        </div>
    );
};

export default HowToUse;