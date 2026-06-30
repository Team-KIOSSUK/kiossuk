import { useState } from 'react';
import './FoodHome.css';

import { categories, menus } from './data/menuData';

import CategorySidebar from './components/CategorySidebar';
import MenuGrid from './components/MenuGrid';
import CartPanel from './components/CartPanel';

export default function FoodHome() {
  const [selectedCategory, setSelectedCategory] = useState('메인메뉴');
  const [cart, setCart] = useState([]);

  const filteredMenus = menus.filter(
    menu => menu.category === selectedCategory
  );

  const addToCart = menu => {
    if (menu.soldOut) return;

    const exist = cart.find(item => item.id === menu.id);

    if (exist) {
      setCart(
        cart.map(item =>
          item.id === menu.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...menu, quantity: 1 }]);
    }
  };

  const increaseQuantity = id => {
    setCart(
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = id => {
    setCart(
      cart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = id => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );

  return (
    <div className="food-kiosk">

      <CategorySidebar
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="center-section">
        <div className="store-header">
          <h1>녹나무 차이나하우스 포차8 IS</h1>
        </div>

        <MenuGrid
          menus={filteredMenus}
          onClickMenu={addToCart}
        />
      </div>

      <CartPanel
        cart={cart}
        total={totalPrice}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
}