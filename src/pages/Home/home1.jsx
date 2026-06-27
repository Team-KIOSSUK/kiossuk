import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import './home1.css'; // 홈 화면 전용 CSS
import '../Kiosk/Kiosk.css'; // 키오스크/두뇌훈련과 공통된 버튼 스타일

export default function Home1() {
  const [isAnimated, setIsAnimated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 컴포넌트가 마운트된 후 짧은 지연을 주어 애니메이션을 시작합니다.
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100); // 100ms 후에 애니메이션 시작

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, []);

  const handleKioskClick = () => {
    navigate('/kiosk');
  };

  const handleBrainTrainingClick = () => {
    navigate('/brain-training');
  };

  const handleRecordsClick = () => {
    navigate('/records');
  };

  const handleSupportClick = () => {
    navigate('/support');
  };

  const menus = [
    {
      id: 'kiosk',
      icon: '☕',
      title: '키오스크',
      onClick: handleKioskClick,
      delay: '0.1s',
    },
    {
      id: 'brain-training',
      icon: '🧠',
      title: '두뇌 훈련',
      onClick: handleBrainTrainingClick,
      delay: '0.2s',
    },
    {
      id: 'records',
      icon: '📈',
      title: '학습 기록',
      onClick: handleRecordsClick,
      delay: '0.3s',
    },
    {
      id: 'support',
      icon: '❓',
      title: '고객지원',
      onClick: handleSupportClick,
      delay: '0.4s',
    },
  ];

  return (
    <div
      style={{
        width: 412,
        height: 917,
        position: 'relative',
        background: 'white',
        overflow: 'hidden',
      }}
    >
      {/* 배경 */}
      <div
        style={{
          width: 412,
          height: 917,
          left: 0,
          top: 0,
          position: 'absolute',
        }}
      >
        <div
          style={{
            width: 89,
            height: 90,
            left: 320.79,
            top: -26,
            position: 'absolute',
            opacity: 0.5,
            background: '#FFCDD9',
            borderRadius: 9999,
          }}
        />
        <div
          style={{
            width: 60.47,
            height: 60,
            left: 18.45,
            top: 62,
            position: 'absolute',
            opacity: 0.5,
            background: '#FFCDD9',
            borderRadius: 9999,
          }}
        />
        <div
          style={{
            width: 60.47,
            height: 60,
            left: 170.13,
            top: 502,
            position: 'absolute',
            opacity: 0.5,
            background: '#FFCDD9',
            borderRadius: 9999,
          }}
        />
        <div
          style={{
            width: 60.47,
            height: 60,
            left: 325.91,
            top: 294,
            position: 'absolute',
            opacity: 0.5,
            background: '#FFCDD9',
            borderRadius: 9999,
          }}
        />
        <div
          style={{
            width: 94.29,
            height: 88,
            left: -15.37,
            top: 361,
            position: 'absolute',
            opacity: 0.5,
            background: '#FFCDD9',
            borderRadius: 9999,
          }}
        />
        <div
          style={{
            width: 60.47,
            height: 60,
            left: 320.79,
            top: 694,
            position: 'absolute',
            opacity: 0.5,
            background: '#FFCDD9',
            borderRadius: 9999,
          }}
        />
        <div
          style={{
            width: 31.77,
            height: 29,
            left: 27.67,
            top: 685,
            position: 'absolute',
            opacity: 0.5,
            background: '#FFCDD9',
            borderRadius: 9999,
          }}
        />
        <div
          style={{
            width: 98.39,
            height: 95,
            left: -30.75,
            top: 848,
            position: 'absolute',
            opacity: 0.5,
            background: '#FBA7C6',
            borderRadius: 9999,
          }}
        />
      </div>

      {/* 로고 */}
      <img
        src={logo}
        alt="키오쑥 로고"
        style={{
          width: 399,
          height: 166,
          left: 1.02,
          top: 80,
          position: 'absolute',
          objectFit: 'contain',
        }}
      />

      {/* 버튼들 */}
      <div className={`home-menu-container ${isAnimated ? 'animated' : ''}`}>
        {menus.map((menu, index) => (
          <button
            key={menu.id}
            className="menu-card home-menu-card"
            onClick={menu.onClick}
            style={{ top: `${325 + index * 135}px`, transitionDelay: menu.delay }}
          >
            <div className="menu-icon">{menu.icon}</div>
            <div className="menu-text">
              {/* 부가 설명 없이 제목만 렌더링 */}
              <h3>{menu.title}</h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}