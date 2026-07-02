import { useLanguage } from "../contexts/LanguageContext";
import { LangCode } from "../i18n/translations";

interface Language {
  code: string;
  label: string;
}

interface LanguageBarProps {
  languages: Language[];
  onShowOrderHistory: () => void;
  onShowCart: () => void;
}

export function LanguageBar({
  languages,
  onShowOrderHistory,
  onShowCart,
}: LanguageBarProps) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="h-16 bg-white border-t border-gray-300 flex items-center justify-between px-6">
      <div className="flex gap-4">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => setLang(language.code as LangCode)}
            className={`px-4 py-2 transition-colors ${
              lang === language.code
                ? "text-black border-b-2 border-black"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {language.label}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onShowOrderHistory}
          className="px-6 py-2 bg-white border border-gray-400 hover:bg-gray-100"
        >
          {t("orderHistory")}
        </button>
        <button
          onClick={onShowCart}
          className="px-6 py-2 bg-[#2a2a2a] text-white hover:bg-[#1a1a1a]"
        >
          {t("cart")}
        </button>
      </div>
    </div>
  );
}
