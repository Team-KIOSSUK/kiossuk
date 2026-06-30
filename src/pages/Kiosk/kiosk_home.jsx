import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Kiosk.css';

const menus = [
  {
    icon: '☕',
    title: '카페 주문',
    desc: '메뉴와 옵션을 골라요',
  },
  {
    icon: '🍔',
    title: '음식점 주문',
    desc: '주문부터 결제까지 해봐요',
  },
  {
    icon: '🏦',
    title: '은행 업무',
    desc: '입출금과 송금을 연습해요',
    path: '/kiosk/bank',
  },
  {
    icon: '🚆',
    title: '기차 예매',
    desc: '기차표를 예매해봐요',
  },
];

export default function Kiosk() {
  const navigate = useNavigate();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 짧은 지연을 주어 애니메이션을 시작합니다.
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100); // 100ms 후에 애니메이션 시작

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, []);

  return (
    <div className="kiosk-page">
      {/* 배경 동그라미 */}
      <div className="bubble bubble1"></div>
      <div className="bubble bubble2"></div>
      <div className="bubble bubble3"></div>
      <div className="bubble bubble4"></div>
      <div className="bubble bubble5"></div>

      {/* 뒤로가기 */}
      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        &lt;
      </button>

      {/* 제목 */}
      <h1 className="page-title">키오스크</h1>

      {/* 안내 박스 */}
      <div className="guide-box">
        <h2>천천히 연습해요</h2>
        <p>
          실제 키오스크처럼 눌러보며 <br></br>주문과 결제 방법을 익혀요.
        </p>
      </div>

      {/* 메뉴 버튼 */}
      <div className={`menu-container ${isAnimated ? 'animated' : ''}`}>
        {menus.map((menu, idx) => (
          <button
            key={idx}
            className="menu-card"
            style={{
              top: `${235 + idx * 125}px`,
              transitionDelay: `${0.1 + idx * 0.1}s`,
            }}
            // 은행을 클릭하면 위에서 적어둔 path 주소로 이동하기
            onClick={() => {
              if (menu.path) {
                navigate(menu.path);
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