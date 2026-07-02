import { MenuItem } from "../types";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

interface MenuGridProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

export function MenuGrid({ items, onAddToCart }: MenuGridProps) {
  const { t, itemName } = useLanguage();

  return (
    <div className="grid grid-cols-3 gap-6 p-8">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative cursor-pointer hover:scale-105 transition-transform"
          onClick={() => !item.soldOut && onAddToCart(item)}
        >
          <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-2">
            <ImageWithFallback
              src={item.image}
              alt={itemName(item)}
              className="w-full h-full object-cover"
            />
          </div>
          {item.soldOut && (
            <div className="absolute top-0 left-0 right-0 bg-[#4a4a4a] text-white text-center py-1 text-sm">
              {t("soldOut")}
            </div>
          )}
          <div className="text-center">
            <div className="mb-1">{itemName(item)}</div>
            <div>{item.price.toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
