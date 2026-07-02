import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Kiosk.css';

const menus = [
  {
    icon: '☕',
    title: '카페 주문',
    desc: '메뉴와 옵션을 골라요',
    path: '/kiosk/cafe',
  },
  {
    icon: '🍔',
    title: '음식점 주문',
    desc: '주문부터 결제까지 해봐요',
    path: '/kiosk/restaurant',
  },
  {
    icon: '🏦',
    title: '은행 업무',
    desc: '입출금과 송금을 연습해요',
    path: '#',
  },
  {
    icon: '🚆',
    title: '기차 예매',
    desc: '기차표를 예매해봐요',
    path: '/kiosk/train',
  },
];

export default function Kiosk() {
  const navigate = useNavigate();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="kiosk-page">
      <div className="bubble bubble1"></div>
      <div className="bubble bubble2"></div>
      <div className="bubble bubble3"></div>
      <div className="bubble bubble4"></div>
      <div className="bubble bubble5"></div>

      <button
        className="back-button"
        onClick={() => navigate('/home1')}
      >
        &lt;
      </button>

      <h1 className="page-title">키오스크</h1>

      <div className="guide-box">
        <h2>천천히 연습해요</h2>
        <p>
          실제 키오스크처럼 눌러보며 <br />
          주문과 결제 방법을 익혀요.
        </p>
      </div>

      <div className={`menu-container ${isAnimated ? 'animated' : ''}`}>
        {menus.map((menu, idx) => (
          <button
            key={menu.title}
            className="menu-card"
            style={{
              top: `${235 + idx * 125}px`,
              transitionDelay: `${0.1 + idx * 0.1}s`,
            }}
            onClick={() => {
              if (menu.path && menu.path !== '#') {
                navigate(menu.path);
              } else {
                alert(`${menu.title} 연습은 준비 중입니다.`);
              }
            }}
          >
            <div className="menu-icon">{menu.icon}</div>

            <div className="menu-text">
              <h3>{menu.title}</h3>
              <p>{menu.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}