import { useTranslation } from "react-i18next";
import i18n from "../../../translations/translationConfig";

const ChangeLng = () => {
    return (
        <div>
            <Change />
        </div>
    );
}

const Change: React.FC<{ text?: string }> = ({ text }) => {
    const { t } = useTranslation();
    text = text || t('changeLanguage') || 'Fehler beim Laden der Sprache';

    const switchLanguage = () => {
        const currentLanguage = i18n.language;
        if (currentLanguage === 'de') {
          i18n.changeLanguage('en');
          localStorage.setItem('language', 'en');
        } else {
          i18n.changeLanguage('de');
          localStorage.setItem('language', 'de');
        }
    }

    return (
        <div className="landing-button group" onClick={switchLanguage}>
            <svg className="h-8 w-8"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
                <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 7h7m-2 -2v2a5 8 0 0 1 -5 8m1 -4a7 4 0 0 0 6.7 4" />  
                <path d="M11 19l4 -9l4 9m-.9 -2h-6.2" />
            </svg>
            
            <span className="navbar-text group-hover:scale-100 z-50">
                {text}
            </span>
        </div>
    );
};

export default ChangeLng;