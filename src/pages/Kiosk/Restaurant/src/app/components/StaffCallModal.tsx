import { X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { TranslationKey } from "../i18n/translations";

interface StaffCallModalProps {
  isOpen: boolean;
  options: string[];
  onClose: () => void;
  onCall: (option: string) => void;
}

export function StaffCallModal({
  isOpen,
  options,
  onClose,
  onCall,
}: StaffCallModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl">{t("staffCallTitle")}</h2>
          <button onClick={onClose} className="hover:bg-gray-100 p-2 rounded">
            <div className="flex items-center gap-2">
              <span>{t("close")}</span>
              <X className="w-5 h-5" />
            </div>
          </button>
        </div>

        <p className="text-gray-500 mb-6">{t("staffCallSubtitle")}</p>

        <div className="grid grid-cols-5 gap-4 mb-6">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onCall(option);
                onClose();
              }}
              className="py-6 px-4 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-lg text-lg transition-colors"
            >
              {t(("staff." + option) as TranslationKey)}
            </button>
          ))}
        </div>

        <div className="text-right text-gray-500 mb-6 whitespace-pre-line">
          {t("staffCallHint")}
        </div>

        <button
          onClick={() => {
            onCall("직원호출");
            onClose();
          }}
          className="w-full py-4 bg-[#2a2a2a] text-white hover:bg-[#1a1a1a] text-xl rounded-lg"
        >
          {t("callStaff")}
        </button>
      </div>
    </div>
  );
}
