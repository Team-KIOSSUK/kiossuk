import { X } from "lucide-react";
import { OrderItem } from "../types";
import { useLanguage } from "../contexts/LanguageContext";

interface OrderHistoryModalProps {
  isOpen: boolean;
  orders: OrderItem[];
  onClose: () => void;
}

export function OrderHistoryModal({
  isOpen,
  orders,
  onClose,
}: OrderHistoryModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const total = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-3xl w-full mx-4 max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h2 className="text-3xl">{t("orderHistoryTitle")}</h2>
          <button onClick={onClose} className="hover:bg-gray-100 p-2 rounded">
            <div className="flex items-center gap-2">
              <span>{t("close")}</span>
              <X className="w-5 h-5" />
            </div>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4 pb-2 border-b text-gray-600">
          <div>{t("itemName")}</div>
          <div className="text-center">{t("qty")}</div>
          <div className="text-right">{t("itemPrice")}</div>
          <div className="text-right">{t("orderPrice")}</div>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-3">
            {orders.map((order, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 text-lg">
                <div>{order.name}</div>
                <div className="text-center">{order.quantity}{t("unit")}</div>
                <div className="text-right">{order.price.toLocaleString()}{t("won")}</div>
                <div className="text-right">{order.total.toLocaleString()}{t("won")}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            {t("noOrders")}
          </div>
        )}

        {orders.length > 0 && (
          <div className="mt-8 pt-6 border-t">
            <div className="flex justify-between items-center text-2xl">
              <span>{t("total")}</span>
              <span>{total.toLocaleString()}{t("won")}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
