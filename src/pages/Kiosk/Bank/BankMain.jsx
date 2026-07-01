// src/pages/Kiosk/Bank/BankMain.jsx 파일 전체 수정
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bank.css';

export default function BankMain() {
  // 1. mode를 지우고 learningMode 하나만 사용합니다.
  const [learningMode, setLearningMode] = useState('practice');
  const navigate = useNavigate();

  // 2. 이제 learningMode를 인자로 받아와서 넘겨줍니다.
  const handleStartTutorial = (featurePath) => {
    navigate(`/kiosk/bank/${featurePath}`, { state: { mode: learningMode } });
  };

  return (
    <div className="bank-main-container">
      <header className="bank-header">
        <h1>🏦 은행 키오스크 학습하기</h1>
        <p>실제 은행 기기와 똑같이 연습해보세요.</p>
      </header>

      <section className="bank-section">
        <h2 className="section-title">1. 학습 방법을 선택하세요</h2>
        <div className="mode-btn-group">
          <button 
            className={`mode-btn ${learningMode === 'demo' ? 'active' : ''}`} 
            onClick={() => setLearningMode('demo')}
          >
            <span className="mode-icon">👀</span>
            <div className="mode-text">
              <strong>눈으로 보기</strong>
              <span>자동으로 시연됩니다</span>
            </div>
          </button>

          <button 
            className={`mode-btn ${learningMode === 'practice' ? 'active' : ''}`} 
            onClick={() => setLearningMode('practice')}
          >
            <span className="mode-icon">👆</span>
            <div className="mode-text">
              <strong>직접 해보기</strong>
              <span>안내에 따라 연습합니다</span>
            </div>
          </button>
        </div>
      </section>

      <section className="bank-section">
        <h2 className="section-title">2. 연습할 거래를 선택하세요</h2>
        <div className="feature-btn-grid">
          {/* 3. 모두 같은 handleStartTutorial 함수를 사용하도록 통일하세요 */}
          <button className="feature-btn" onClick={() => handleStartTutorial('withdrawal')}>예금 인출</button>
          <button className="feature-btn" onClick={() => handleStartTutorial('transfer')}>계좌 이체</button>
          <button className="feature-btn" onClick={() => handleStartTutorial('inquiry')}>예금 조회</button>
          <button className="feature-btn" onClick={() => handleStartTutorial('passbook')}>통장 정리</button>
        </div>
      </section>
    </div>
  );
}