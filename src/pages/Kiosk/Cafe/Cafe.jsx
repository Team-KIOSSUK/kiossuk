import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cafe.css';

const img = (file) => `/images/cafe/${file}`;

const cafeMenus = [
  { id: 1, category: 'coffee', name: '아메리카노', price: 3500, img: img('americano.jpg'), options: ['temp', 'size', 'ice', 'shot'] },
  { id: 2, category: 'coffee', name: '카페라떼', price: 4300, img: img('cafe_latte.jpg'), options: ['temp', 'size', 'ice', 'shot'] },
  { id: 3, category: 'coffee', name: '바닐라라떼', price: 4800, img: img('vanilla_latte.jpg'), options: ['temp', 'size', 'ice', 'shot', 'whip'] },
  { id: 4, category: 'coffee', name: '말차 샷 라떼', price: 5500, img: img('matcha_shot_latte.jpg'), options: ['temp', 'size', 'ice', 'shot', 'whip'] },
  { id: 5, category: 'coffee', name: '카페모카', price: 5000, img: img('cafe_mocha.jpg'), options: ['temp', 'size', 'ice', 'shot', 'whip'] },

  { id: 6, category: 'latte', name: '딸기 라떼', price: 5200, img: img('strawberry_latte.jpg'), options: ['size', 'ice', 'sweet', 'whip', 'pearl'] },
  { id: 7, category: 'latte', name: '말차 라떼', price: 5000, img: img('matcha_latte.jpg'), options: ['temp', 'size', 'ice', 'sweet', 'whip'] },

  { id: 8, category: 'tea', name: '아이스티', price: 3900, img: img('peach_iced_tea.jpg'), options: ['size', 'ice', 'sweet'] },
  { id: 9, category: 'tea', name: '자몽티', price: 4500, img: img('grapefruit_tea.jpg'), options: ['temp', 'size', 'sweet'] },

  { id: 10, category: 'ade', name: '레몬 에이드', price: 4800, img: img('lemon_ade.jpg'), options: ['size', 'ice', 'sweet'] },
  { id: 11, category: 'ade', name: '청포도 에이드', price: 5000, img: img('green_grape_ade.jpg'), options: ['size', 'ice', 'sweet'] },
  { id: 12, category: 'ade', name: '자몽 에이드', price: 5000, img: img('grapefruit_ade.jpg'), options: ['size', 'ice', 'sweet'] },

  { id: 13, category: 'smoothie', name: '키위 생과일 스무디', price: 5900, img: img('kiwi_smoothie.jpg'), options: ['size', 'ice', 'sweet', 'whip'] },
  { id: 14, category: 'smoothie', name: '수박 스무디', price: 5900, img: img('watermelon_smoothie.jpg'), options: ['size', 'ice', 'sweet'] },
  { id: 15, category: 'smoothie', name: '녹차 스무디', price: 6100, img: img('green_tea_smoothie.jpg'), options: ['size', 'ice', 'sweet', 'whip'] },
  { id: 16, category: 'smoothie', name: '초코 스무디', price: 6100, img: img('chocolate_smoothie.jpg'), options: ['size', 'ice', 'sweet', 'whip'] },
  { id: 17, category: 'smoothie', name: '밀크티 스무디', price: 6200, img: img('milk_tea_smoothie.jpg'), options: ['size', 'ice', 'sweet', 'whip', 'pearl'] },
  { id: 18, category: 'smoothie', name: '블루베리 요거트 스무디', price: 6300, img: img('blueberry_yogurt_smoothie.jpg'), options: ['size', 'ice', 'sweet', 'whip'] },
  { id: 19, category: 'smoothie', name: '딸기 요거트 스무디', price: 6300, img: img('strawberry_yogurt_smoothie.jpg'), options: ['size', 'ice', 'sweet', 'whip'] },
  { id: 20, category: 'smoothie', name: '망고 요거트 스무디', price: 6300, img: img('mango_yogurt_smoothie.jpg'), options: ['size', 'ice', 'sweet', 'whip'] },

  { id: 21, category: 'bubble', name: '밀크 버블티', price: 5500, img: img('milk_bubble_tea.jpg'), options: ['size', 'ice', 'sweet', 'pearl'] },
  { id: 22, category: 'bubble', name: '말차 버블티', price: 5800, img: img('matcha_bubble_tea.jpg'), options: ['size', 'ice', 'sweet', 'pearl'] },
  { id: 23, category: 'bubble', name: '흑당 버블티', price: 5900, img: img('brown_sugar_bubble_tea.jpg'), options: ['size', 'ice', 'sweet', 'pearl'] },

  { id: 24, category: 'cake', name: '레드벨벳 케이크', price: 6200, img: img('red_velvet_cake.jpg'), options: ['fork'] },
  { id: 25, category: 'cake', name: '블루베리 치즈케이크', price: 6500, img: img('blueberry_cheesecake.jpg'), options: ['fork'] },
  { id: 26, category: 'cake', name: '뉴욕 치즈케이크', price: 6300, img: img('newyork_cheesecake.jpg'), options: ['fork'] },
  { id: 27, category: 'cake', name: '바스크 치즈케이크', price: 6800, img: img('basque_cheesecake.jpg'), options: ['fork'] },
  { id: 28, category: 'cake', name: '초코 가나슈 케이크', price: 6900, img: img('chocolate_ganache_cake.jpg'), options: ['fork'] },

  { id: 29, category: 'dessert', name: '레드벨벳 스모어 쿠키', price: 3800, img: img('red_velvet_cookie.jpg'), options: ['heat'] },
  { id: 30, category: 'dessert', name: '에그타르트', price: 3300, img: img('egg_tart.jpg'), options: ['heat'] },
  { id: 31, category: 'dessert', name: '팬케이크', price: 7200, img: img('pancake.jpg'), options: ['syrup', 'cream'] },
  { id: 32, category: 'dessert', name: '크림치즈 베이글', price: 4500, img: img('cream_cheese_bagel.jpg'), options: ['heat', 'cream'] },
  { id: 33, category: 'dessert', name: '메론빵', price: 3600, img: img('melon_pan.jpg'), options: ['heat'] },
  { id: 34, category: 'dessert', name: '초코칩 쿠키', price: 3200, img: img('chocolate_chip_cookie.jpg'), options: ['heat'] },
];

const categories = [
  { key: 'all', label: '전체' },
  { key: 'coffee', label: '커피' },
  { key: 'latte', label: '라떼' },
  { key: 'tea', label: '티' },
  { key: 'ade', label: '에이드' },
  { key: 'smoothie', label: '스무디' },
  { key: 'bubble', label: '버블티' },
  { key: 'cake', label: '케이크' },
  { key: 'dessert', label: '디저트' },
];

const defaultOptions = {
  temp: 'ICE',
  size: { label: 'Regular', price: 0 },
  ice: '보통',
  sweet: '보통',
  shot: false,
  whip: false,
  pearl: false,
  fork: true,
  heat: false,
  cream: false,
  syrup: false,
};

export default function Cafe() {
  const navigate = useNavigate();
  const [step, setStep] = useState('type');
  const [orderType, setOrderType] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [options, setOptions] = useState(defaultOptions);
  const [cart, setCart] = useState([]);
  const [payMethod, setPayMethod] = useState('카드');
  const [orderNumber, setOrderNumber] = useState(null);

  const filteredMenus = useMemo(() => {
    if (category === 'all') return cafeMenus;
    return cafeMenus.filter((menu) => menu.category === category);
  }, [category]);

  const optionPrice =
    options.size.price +
    (options.shot ? 500 : 0) +
    (options.whip ? 700 : 0) +
    (options.pearl ? 800 : 0) +
    (options.heat ? 300 : 0) +
    (options.cream ? 700 : 0) +
    (options.syrup ? 500 : 0);

  const selectedPrice = selectedMenu ? selectedMenu.price + optionPrice : 0;
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const makeOptionText = (menu, opt) => {
    const result = [];
    if (menu.options.includes('temp')) result.push(opt.temp);
    if (menu.options.includes('size')) result.push(opt.size.label);
    if (menu.options.includes('ice')) result.push(`얼음 ${opt.ice}`);
    if (menu.options.includes('sweet')) result.push(`당도 ${opt.sweet}`);
    if (menu.options.includes('shot') && opt.shot) result.push('샷 추가');
    if (menu.options.includes('whip') && opt.whip) result.push('휘핑 추가');
    if (menu.options.includes('pearl') && opt.pearl) result.push('펄 추가');
    if (menu.options.includes('fork')) result.push(opt.fork ? '포크 제공' : '포크 없음');
    if (menu.options.includes('heat') && opt.heat) result.push('데우기');
    if (menu.options.includes('cream') && opt.cream) result.push('크림치즈 추가');
    if (menu.options.includes('syrup') && opt.syrup) result.push('시럽 추가');
    return result.length > 0 ? result.join(' / ') : '기본';
  };

  const addToCart = () => {
    const optionText = makeOptionText(selectedMenu, options);
    const cartKey = `${selectedMenu.id}-${optionText}`;

    setCart((prev) => {
      const found = prev.find((item) => item.cartKey === cartKey);
      if (found) {
        return prev.map((item) =>
          item.cartKey === cartKey ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [
        ...prev,
        {
          cartKey,
          name: selectedMenu.name,
          img: selectedMenu.img,
          optionText,
          price: selectedPrice,
          quantity: 1,
        },
      ];
    });

    setSelectedMenu(null);
  };

  const changeQuantity = (cartKey, amount) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const resetAll = () => {
    setStep('type');
    setOrderType('');
    setCart([]);
    setCategory('all');
    setPayMethod('카드');
    setOrderNumber(null);
  };

  return (
    <div className="cafe-page">
      {step === 'type' && (
        <section className="cafe-type-page">
          <button className="cafe-back-btn" onClick={() => navigate(-1)}>←</button>
          <div className="cafe-type-card">
            <p className="cafe-type-brand">KIOSSUK CAFE</p>
            <h1>주문 방식을 선택해주세요</h1>
            <div className="cafe-type-buttons">
              <button onClick={() => { setOrderType('매장'); setStep('menu'); }}>
                <span>🍽️</span>
                <strong>매장에서 먹기</strong>
                <p>매장 이용</p>
              </button>
              <button onClick={() => { setOrderType('포장'); setStep('menu'); }}>
                <span>🥡</span>
                <strong>포장하기</strong>
                <p>테이크아웃</p>
              </button>
            </div>
          </div>
        </section>
      )}

      {step !== 'type' && (
        <div className="cafe-app">
          <aside className="cafe-side">
            <button className="cafe-back-btn" onClick={() => setStep('type')}>←</button>
            <div className="cafe-brand">
              <div className="cafe-logo">☕</div>
              <h1>KIOSSUK<br />CAFE</h1>
              <p>{orderType} 주문</p>
            </div>
            <div className="cafe-step-box">
              <div className={step === 'menu' ? 'on' : ''}>1 메뉴 선택</div>
              <div className={step === 'payment' ? 'on' : ''}>2 결제 선택</div>
              <div className={step === 'complete' ? 'on' : ''}>3 주문 완료</div>
            </div>
          </aside>

          <main className="cafe-screen">
            {step === 'menu' && (
              <>
                <header className="cafe-top">
                  <div>
                    <span className="cafe-small-title">{orderType} 주문</span>
                    <h2>메뉴를 선택해주세요</h2>
                  </div>
                </header>

                <div className="cafe-category-scroll">
                  {categories.map((item) => (
                    <button
                      key={item.key}
                      className={category === item.key ? 'active' : ''}
                      onClick={() => setCategory(item.key)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <section className="cafe-menu-grid">
                  {filteredMenus.map((menu) => (
                    <button
                      key={menu.id}
                      className="cafe-product-card"
                      onClick={() => {
                        setSelectedMenu(menu);
                        setOptions(defaultOptions);
                      }}
                    >
                      <div className="cafe-product-img-wrap">
                        <img src={menu.img} alt={menu.name} />
                      </div>
                      <div className="cafe-product-info">
                        <h3>{menu.name}</h3>
                        <strong>{menu.price.toLocaleString()}원</strong>
                      </div>
                    </button>
                  ))}
                </section>
              </>
            )}

            {step === 'payment' && (
              <section className="cafe-payment-screen">
                <h2>결제 방법을 선택해주세요</h2>
                <div className="cafe-pay-buttons">
                  {['카드', '간편결제', '현금'].map((method) => (
                    <button
                      key={method}
                      className={payMethod === method ? 'active' : ''}
                      onClick={() => setPayMethod(method)}
                    >
                      {method === '카드' && '💳'}
                      {method === '간편결제' && '📱'}
                      {method === '현금' && '💵'}
                      <span>{method}</span>
                    </button>
                  ))}
                </div>
                <div className="cafe-payment-actions">
                  <button onClick={() => setStep('menu')}>이전</button>
                  <button onClick={() => {
                    setOrderNumber(Math.floor(Math.random() * 900) + 100);
                    setStep('complete');
                  }}>
                    결제 완료
                  </button>
                </div>
              </section>
            )}

            {step === 'complete' && (
              <section className="cafe-complete-screen">
                <div className="cafe-check">✓</div>
                <h2>주문이 완료되었습니다</h2>
                <p>주문번호</p>
                <strong>{orderNumber}</strong>
                <span>{orderType} / {payMethod} 결제</span>
                <button onClick={resetAll}>처음으로</button>
              </section>
            )}
          </main>

          <aside className="cafe-cart">
            <div className="cafe-cart-head">
              <h2>장바구니</h2>
              <button onClick={() => setCart([])}>비우기</button>
            </div>

            <div className="cafe-cart-list">
              {cart.length === 0 ? (
                <div className="cafe-empty">
                  <p>담긴 메뉴가 없습니다.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div className="cafe-cart-item" key={item.cartKey}>
                    <img src={item.img} alt={item.name} />
                    <div className="cafe-cart-text">
                      <h3>{item.name}</h3>
                      <p>{item.optionText}</p>
                      <strong>{item.price.toLocaleString()}원</strong>
                    </div>
                    <div className="cafe-qty">
                      <button onClick={() => changeQuantity(item.cartKey, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => changeQuantity(item.cartKey, 1)}>+</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="cafe-total">
              <span>총 {totalCount}개</span>
              <strong>{totalPrice.toLocaleString()}원</strong>
            </div>

            {step === 'menu' && (
              <button
                className="cafe-pay-btn"
                onClick={() => {
                  if (cart.length === 0) {
                    alert('메뉴를 먼저 선택해주세요.');
                    return;
                  }
                  setStep('payment');
                }}
              >
                결제하기
              </button>
            )}
          </aside>
        </div>
      )}

      {selectedMenu && (
        <div className="cafe-modal-bg">
          <div className="cafe-modal">
            <button className="cafe-close" onClick={() => setSelectedMenu(null)}>×</button>
            <div className="cafe-modal-top">
              <img src={selectedMenu.img} alt={selectedMenu.name} />
              <div>
                <h2>{selectedMenu.name}</h2>
                <strong>{selectedMenu.price.toLocaleString()}원</strong>
              </div>
            </div>

            {selectedMenu.options.includes('temp') && (
              <OptionButtons title="HOT / ICE" items={['HOT', 'ICE']} value={options.temp} onClick={(v) => setOptions((p) => ({ ...p, temp: v }))} />
            )}
            {selectedMenu.options.includes('size') && (
              <div className="cafe-option-group">
                <h3>사이즈</h3>
                <div className="cafe-option-row">
                  {[{ label: 'Regular', price: 0 }, { label: 'Large', price: 700 }].map((size) => (
                    <button key={size.label} className={options.size.label === size.label ? 'active' : ''} onClick={() => setOptions((p) => ({ ...p, size }))}>
                      {size.label}<small>{size.price ? `+${size.price}원` : '기본'}</small>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {selectedMenu.options.includes('ice') && (
              <OptionButtons title="얼음" items={['적게', '보통', '많이']} value={options.ice} onClick={(v) => setOptions((p) => ({ ...p, ice: v }))} />
            )}
            {selectedMenu.options.includes('sweet') && (
              <OptionButtons title="당도" items={['덜 달게', '보통', '달게']} value={options.sweet} onClick={(v) => setOptions((p) => ({ ...p, sweet: v }))} />
            )}

            <div className="cafe-option-group">
              <h3>추가 옵션</h3>
              <div className="cafe-add-options">
                {selectedMenu.options.includes('shot') && <CheckOption label="샷 추가 +500원" checked={options.shot} onChange={(v) => setOptions((p) => ({ ...p, shot: v }))} />}
                {selectedMenu.options.includes('whip') && <CheckOption label="휘핑크림 +700원" checked={options.whip} onChange={(v) => setOptions((p) => ({ ...p, whip: v }))} />}
                {selectedMenu.options.includes('pearl') && <CheckOption label="펄 추가 +800원" checked={options.pearl} onChange={(v) => setOptions((p) => ({ ...p, pearl: v }))} />}
                {selectedMenu.options.includes('fork') && <CheckOption label="포크 제공" checked={options.fork} onChange={(v) => setOptions((p) => ({ ...p, fork: v }))} />}
                {selectedMenu.options.includes('heat') && <CheckOption label="데우기 +300원" checked={options.heat} onChange={(v) => setOptions((p) => ({ ...p, heat: v }))} />}
                {selectedMenu.options.includes('cream') && <CheckOption label="크림치즈 +700원" checked={options.cream} onChange={(v) => setOptions((p) => ({ ...p, cream: v }))} />}
                {selectedMenu.options.includes('syrup') && <CheckOption label="시럽 추가 +500원" checked={options.syrup} onChange={(v) => setOptions((p) => ({ ...p, syrup: v }))} />}
              </div>
            </div>

            <div className="cafe-modal-bottom">
              <strong>{selectedPrice.toLocaleString()}원</strong>
              <button onClick={addToCart}>장바구니 담기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function OptionButtons({ title, items, value, onClick }) {
  return (
    <div className="cafe-option-group">
      <h3>{title}</h3>
      <div className="cafe-option-row">
        {items.map((item) => (
          <button key={item} className={value === item ? 'active' : ''} onClick={() => onClick(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function CheckOption({ label, checked, onChange }) {
  return (
    <label className={checked ? 'active' : ''}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}