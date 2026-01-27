import React, { createContext, useEffect, useState } from "react";
import en from "./locales/en.json";
import az from "./locales/az.json";
import tr from "./locales/tr.json";
import ar from "./locales/ar.json";
import uz from "./locales/uz.json";

export const LanguageContext = createContext({});

const locales = {
  en,
  az,
  tr,
  ar,
  uz,
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem("lang") || "az";
    } catch (e) {
      return "az";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("lang", language);
    } catch (e) {}
  }, [language]);

  const t = (key) => {
    return (locales[language] && locales[language][key]) || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
