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

const language = localStorage.getItem('language') || 'de';
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