import { CartItem } from "../types";
import { useLanguage } from "../contexts/LanguageContext";

interface OrderConfirmDialogProps {
  isOpen: boolean;
  cart: CartItem[];
  onConfirm: () => void;
  onCancel: () => void;
}

export function OrderConfirmDialog({
  isOpen,
  cart,
  onConfirm,
  onCancel,
}: OrderConfirmDialogProps) {
  const { t, itemName } = useLanguage();

  if (!isOpen) return null;

  const total = cart.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full mx-4">
        <h2 className="text-2xl text-center text-red-600 mb-8 whitespace-pre-line">
          {t("orderConfirmTitle")}
        </h2>

        <div className="space-y-4 mb-6">
          {cart.map((item) => (
            <div key={item.menuItem.id} className="flex items-center gap-4">
              <div className="flex-1">{itemName(item.menuItem)}</div>
              <div className="text-center">
                {item.quantity}
                <br />{t("unit")}
              </div>
              <div className="w-24 text-right">
                {item.menuItem.price.toLocaleString()}
              </div>
              <div className="w-24 text-right">
                {(item.menuItem.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}

          <div className="border-t pt-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">{t("basic")}</div>
              <div className="w-24"></div>
              <div className="w-24 text-right">
                {cart[0]?.menuItem.price.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between text-xl">
              <span>{t("total")}</span>
              <span className="text-red-600">{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-4 bg-gray-300 hover:bg-gray-400 text-lg rounded"
          >
            {t("no")}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-4 bg-[#2a2a2a] text-white hover:bg-[#1a1a1a] text-lg rounded"
          >
            {t("yes")}
          </button>
        </div>
      </div>
    </div>
  );
}
