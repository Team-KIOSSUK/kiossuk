import { Minus, Plus } from "lucide-react";
import { CartItem } from "../types";
import { useLanguage } from "../contexts/LanguageContext";

interface CartPanelProps {
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onClose: () => void;
  onOrder: () => void;
}

export function CartPanel({
  cart,
  onUpdateQuantity,
  onClose,
  onOrder,
}: CartPanelProps) {
  const { t, itemName } = useLanguage();

  const total = cart.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  const firstItem = cart[0];

  if (cart.length === 0) return null;

  return (
    <div className="w-80 bg-[#e8e8e8] border-l border-gray-300 flex flex-col">
      <div className="p-6 border-b border-gray-300 flex items-center justify-between">
        <div className="text-2xl">{itemName(firstItem.menuItem)}</div>
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-400 bg-white hover:bg-gray-100"
        >
          {t("delete")}
        </button>
      </div>

      <div className="flex-1 p-6">
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span>{t("basic")}</span>
            <span>{firstItem.menuItem.price.toLocaleString()}</span>
          </div>
        </div>

        <div className="text-4xl mb-6">{total.toLocaleString()}</div>

        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() =>
              onUpdateQuantity(firstItem.menuItem.id, firstItem.quantity - 1)
            }
            className="w-12 h-12 bg-gray-300 hover:bg-gray-400 flex items-center justify-center rounded"
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="text-2xl">
            {firstItem.quantity}{t("unit")}
          </span>
          <button
            onClick={() =>
              onUpdateQuantity(firstItem.menuItem.id, firstItem.quantity + 1)
            }
            className="w-12 h-12 bg-gray-300 hover:bg-gray-400 flex items-center justify-center rounded"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6 bg-white">
        <div className="flex justify-between text-xl mb-4">
          <span>{t("total")}</span>
          <span>{total.toLocaleString()}</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-4 bg-gray-300 hover:bg-gray-400 text-lg"
          >
            {t("addToCart")}
          </button>
          <button
            onClick={onOrder}
            className="flex-1 py-4 bg-[#2a2a2a] text-white hover:bg-[#1a1a1a] text-lg"
          >
            {t("order")}
          </button>
        </div>
      </div>
    </div>
  );
}
