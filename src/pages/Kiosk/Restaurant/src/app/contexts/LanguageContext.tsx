import { createContext, useContext, useState, ReactNode } from "react";
import { LangCode, TranslationKey, translations } from "../i18n/translations";
import { MenuItem } from "../types";

interface LanguageContextValue {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: (key: TranslationKey) => string;
  itemName: (item: MenuItem) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LangCode>("ko");

  const t = (key: TranslationKey): string => {
    return (translations[lang] as Record<string, string>)[key] ?? (translations.ko as Record<string, string>)[key] ?? key;
  };

  const itemName = (item: MenuItem): string => {
    if (lang === "en") return item.nameEn ?? item.name;
    if (lang === "ja") return item.nameJa ?? item.name;
    if (lang === "zh") return item.nameZh ?? item.name;
    return item.name;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, itemName }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
