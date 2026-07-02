import { useState } from "react";
import { Menu, BookOpen } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { MenuGrid } from "../components/MenuGrid";
import { CartPanel } from "../components/CartPanel";
import { LanguageBar } from "../components/LanguageBar";
import { OrderConfirmDialog } from "../components/OrderConfirmDialog";
import { OrderHistoryModal } from "../components/OrderHistoryModal";
import { StaffCallModal } from "../components/StaffCallModal";
import { TutorialModal } from "../components/TutorialModal";
import { menuData, categories, languages, staffCallOptions } from "../data/menuData";
import { CartItem, MenuItem, OrderItem } from "../types";
import { LanguageProvider } from "../contexts/LanguageContext";
import { toast } from "sonner";

function MainPageInner() {
  const [selectedCategory, setSelectedCategory] = useState("메인메뉴");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showStaffCall, setShowStaffCall] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const filteredItems = menuData.filter(
    (item) => item.category === selectedCategory
  );

  const handleAddToCart = (item: MenuItem) => {
    const existingItem = cart.find((cartItem) => cartItem.menuItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.menuItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { menuItem: item, quantity: 1 }]);
    }
    setShowCart(true);
    toast.success(`${item.name}이(가) 장바구니에 추가되었습니다.`);
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter((item) => item.menuItem.id !== itemId));
      if (cart.length === 1) setShowCart(false);
    } else {
      setCart(
        cart.map((item) =>
          item.menuItem.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleOrder = () => setShowOrderConfirm(true);

  const handleConfirmOrder = () => {
    const newOrders: OrderItem[] = cart.map((item) => ({
      name: item.menuItem.name,
      quantity: item.quantity,
      price: item.menuItem.price,
      total: item.menuItem.price * item.quantity,
    }));
    setOrders([...orders, ...newOrders]);
    setCart([]);
    setShowOrderConfirm(false);
    setShowCart(false);
    toast.success("주문이 완료되었습니다!");
  };

  const handleShowCart = () => {
    if (cart.length === 0) {
      toast.info("장바구니가 비어있습니다.");
    } else {
      setShowCart(true);
    }
  };

  const handleStaffCall = (option: string) => {
    toast.success(`${option} 요청이 전달되었습니다.`);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="flex-1 flex overflow-hidden">
        {sidebarVisible && (
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onStaffCall={() => setShowStaffCall(true)}
            onToggle={() => setSidebarVisible(false)}
          />
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center gap-4">
            {!sidebarVisible && (
              <button
                onClick={() => setSidebarVisible(true)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
            )}
            <h1 className="text-2xl font-medium text-black">녹나무</h1>
            <button
              onClick={() => setShowTutorial(true)}
              className="ml-auto flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              사용 가이드
            </button>
          </div>
          <div className="flex-1 overflow-auto">
            <MenuGrid items={filteredItems} onAddToCart={handleAddToCart} />
          </div>
        </div>

        {showCart && (
          <CartPanel
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onClose={() => setShowCart(false)}
            onOrder={handleOrder}
          />
        )}
      </div>

      <LanguageBar
        languages={languages}
        onShowOrderHistory={() => setShowOrderHistory(true)}
        onShowCart={handleShowCart}
      />

      <OrderConfirmDialog
        isOpen={showOrderConfirm}
        cart={cart}
        onConfirm={handleConfirmOrder}
        onCancel={() => setShowOrderConfirm(false)}
      />

      <OrderHistoryModal
        isOpen={showOrderHistory}
        orders={orders}
        onClose={() => setShowOrderHistory(false)}
      />

      <StaffCallModal
        isOpen={showStaffCall}
        options={staffCallOptions}
        onClose={() => setShowStaffCall(false)}
        onCall={handleStaffCall}
      />

      <TutorialModal
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
      />
    </div>
  );
}

export function MainPage() {
  return (
    <LanguageProvider>
      <MainPageInner />
    </LanguageProvider>
  );
}
