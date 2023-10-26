import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import de from "./de.json";
import en from "./en.json";

//! Übersetzungen fehlen überall! @Leonidas-maker @Schuetze1000

const resources = {
    en: {
        translation: en
    },
    de: {
        translation: de
    }
};

// Set standard language based on browser language
// If language not available set to 'en'
const getDefaultLanguage = () => {
  const browserLang = navigator.language.split("-")[0];
  return resources[browserLang] ? browserLang : 'en';
}

// Choose language from localStorage, if not in storage choose from browser language
const language = localStorage.getItem('language') || getDefaultLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: language,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;