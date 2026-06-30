import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Kiosk/Kiosk.css'; // 키오스크 페이지와 동일한 스타일을 재사용합니다.

const menus = [
  {
    icon: '🔨',
    title: '두더지잡기',
    desc: '빠르게 두더지를 잡아요',
  },
  {
    icon: '🦖',
    title: '공룡달리기',
    desc: '장애물을 피하며 달려요',
  },
  {
    icon: '🛒',
    title: '장보기',
    desc: '목록의 물건을 기억해요',
  },
  {
    icon: '✌️',
    title: '조건형 가위바위보',
    desc: '조건에 맞게 이기거나 져요',
  },
];

export default function BrainTraining() {
  const navigate = useNavigate();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 짧은 지연을 주어 애니메이션을 시작합니다.
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100); // 100ms 후에 애니메이션 시작

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, []);

  const handleGameClick = (gameTitle) => {
    // 1. 새로운 기록 생성
    const newRecord = {
      game: gameTitle,
      date: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    // 2. 기존 기록을 불러와 새로운 기록 추가
    const savedRecords = JSON.parse(localStorage.getItem('kiossukGameRecords')) || [];
    const updatedRecords = [newRecord, ...savedRecords];

    // 3. 다시 localStorage에 저장
    localStorage.setItem('kiossukGameRecords', JSON.stringify(updatedRecords));

    if (gameTitle === '두더지잡기') {
      navigate('/brain-training/mole');
    }
  };

  return (
    <div className="kiosk-page">
      {/* 배경 동그라미 */}
      <div className="bubble bubble1"></div>
      <div className="bubble bubble2"></div>
      <div className="bubble bubble3"></div>
      <div className="bubble bubble4"></div>
      <div className="bubble bubble5"></div>

      {/* 뒤로가기 */}
      <button className="back-button" onClick={() => navigate('/home1')}>
        &lt;
      </button>

      {/* 제목 */}
      <h1 className="page-title">두뇌 훈련</h1>

      {/* 안내 박스 */}
      <div className="guide-box">
        <h2>매일매일 두뇌 체조</h2>
        <p>
          재미있는 게임으로
          <br />
          기억력과 순발력을 키워요.
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
            onClick={() => handleGameClick(menu.title)}
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
