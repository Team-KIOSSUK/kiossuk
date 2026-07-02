import { Menu } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { TranslationKey } from "../i18n/translations";
import logo from "../../imports/image.png";

interface SidebarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onStaffCall: () => void;
  onToggle: () => void;
}

export function Sidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  onStaffCall,
  onToggle,
}: SidebarProps) {
  const { t } = useLanguage();

  return (
    <div className="w-52 bg-[#2a2a2a] flex flex-col relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #1a1a1a 25%, transparent 25%),
            linear-gradient(-45deg, #1a1a1a 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #1a1a1a 75%),
            linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0px",
        }}
      />

      <div className="relative p-4 flex items-center gap-2 border-b border-gray-700">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
          <img src={logo} alt="녹나무 로고" className="w-full h-full object-contain" />
        </div>
        <span className="text-white text-sm">녹나무</span>
        <button onClick={onToggle} className="ml-auto p-2 hover:bg-gray-700 rounded">
          <Menu className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="relative flex-1 py-6">
        {categories.map((category) => (
          <div
            key={category}
            className={`px-6 py-3 text-lg cursor-pointer transition-colors ${
              selectedCategory === category
                ? "bg-white text-black"
                : "text-white hover:bg-gray-700"
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {t(("cat." + category) as TranslationKey)}
          </div>
        ))}
      </div>

      <div className="relative p-4">
        <button
          onClick={onStaffCall}
          className="w-full py-4 bg-white text-black text-lg hover:bg-gray-100 transition-colors"
        >
          {t("staffCall")}
        </button>
      </div>
    </div>
  );
}
