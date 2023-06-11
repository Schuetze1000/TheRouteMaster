import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Back_landing = () => {
    return (
        <div>
            <Back />
        </div>
    );
}

const Back: React.FC<{ text?: string }> = ({ text }) => {
    const navigate = useNavigate();
    const handleClickAccount = () => navigate("/");
    const { t } = useTranslation();
    text = text || t('back_nav') || 'Fehler beim Laden der Sprache';

    return (
        <div className="landing-button group" onClick={handleClickAccount}>
            <svg className="h-8 w-8"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
            </svg>

            <span className="navbar-text group-hover:scale-100 z-50">
                {text}
            </span>
        </div>
    );
};

export default Back_landing;