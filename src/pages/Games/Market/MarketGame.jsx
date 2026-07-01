import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MarketGame.css';

const ITEMS = ['사과', '우유', '빵']; // 정답 물건 3개

export default function MarketGame() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [showPrompt, setShowPrompt] = useState(true); // 제시문 보이기 상태

  // 📍 핵심 로직: 5초(5000ms) 뒤에 제시문을 숨깁니다.
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleItemClick = (item) => {
    // 5초가 지나기 전에는 못 누르게 막기
    if (showPrompt) {
      alert("지금은 외우는 시간입니다! 글자가 사라지면 눌러주세요.");
      return;
    }

    if (ITEMS.includes(item)) {
      if (!cart.includes(item)) {
        const newCart = [...cart, item];
        setCart(newCart);
        if (newCart.length === ITEMS.length) {
          alert("성공! 다 기억하셨네요.");
          navigate('/'); // 게임 종료 후 돌아갈 경로
        }
      }
    } else {
      alert("틀렸어요! 쇼핑 목록에 없는 물건입니다.");
    }
  };

  return (
    <div className="game-container">
      
      {/* 제시문 영역: 인라인 스타일로 글자색(#333)을 강제 적용해 무조건 보이게 합니다 */}
      <div style={{ height: '80px', marginBottom: '20px', textAlign: 'center' }}>
        {showPrompt ? (
          <h2 style={{ color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
            5초 동안 외우세요!<br />쇼핑 목록: {ITEMS.join(', ')}
          </h2>
        ) : (
          <h2 style={{ color: '#e74c3c', fontSize: '24px', fontWeight: 'bold' }}>
            기억나는 물건 3개를 고르세요!
          </h2>
        )}
      </div>

      <div className="item-grid">
        {['사과', '콜라', '우유', '비누', '빵'].map(item => (
          <button key={item} className="item-btn" onClick={() => handleItemClick(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}