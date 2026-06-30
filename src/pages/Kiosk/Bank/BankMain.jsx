import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bank.css'; // 공통 스타일 연결

export default function BankMain() {
  const navigate = useNavigate();
  
  // 기본 학습 모드는 '연습 모드(practice)'로 설정합니다.
  const [learningMode, setLearningMode] = useState('practice');

  // 기능 버튼을 눌렀을 때 해당 튜토리얼 페이지로 이동하는 함수
  const handleStartTutorial = (featurePath) => {
    // 이동할 경로와 함께, 현재 선택된 모드(mode) 데이터를 같이 넘겨줍니다.
    navigate(`/kiosk/bank/${featurePath}`, { state: { mode: learningMode } });
  };

  return (
    <div className="bank-main-container">
      {/* 헤더 영역 */}
      <header className="bank-header">
        <h1>🏦 은행 키오스크 학습하기</h1>
        <p>실제 은행 기기와 똑같이 연습해보세요.</p>
      </header>

      {/* 1. 학습 모드 선택 영역 */}
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

          <button 
            className={`mode-btn ${learningMode === 'quiz' ? 'active' : ''}`} 
            onClick={() => setLearningMode('quiz')}
          >
            <span className="mode-icon">🏆</span>
            <div className="mode-text">
              <strong>혼자 해보기</strong>
              <span>도움 없이 도전합니다</span>
            </div>
          </button>
        </div>
      </section>

      {/* 2. 기능 선택 영역 */}
      <section className="bank-section">
        <h2 className="section-title">2. 연습할 거래를 선택하세요</h2>
        <div className="feature-btn-grid">
          <button className="feature-btn" onClick={() => handleStartTutorial('withdrawal')}>
            예금 인출
          </button>
          <button className="feature-btn" onClick={() => handleStartTutorial('transfer')}>
            계좌 이체
          </button>
          <button className="feature-btn" onClick={() => handleStartTutorial('balance')}>
            예금 조회
          </button>
          <button className="feature-btn" onClick={() => handleStartTutorial('passbook')}>
            통장 정리
          </button>
        </div>
      </section>
    </div>
  );
}