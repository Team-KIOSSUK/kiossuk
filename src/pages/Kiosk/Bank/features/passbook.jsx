// src/pages/Kiosk/Bank/features/passbook.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { tutorialData } from '../data/TutorialData';
import '../Bank.css';

export default function Passbook() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const mode = location.state?.mode || 'practice';
  const data = tutorialData.passbook; // 👈 passbook 데이터 불러오기

  return (
    <div className="bank-main-container">
      <header className="bank-header">
        <h1>{data.title} - {mode === 'demo' ? '눈으로 보기' : '연습'}</h1>
      </header>

      <section className="bank-section">
        <div className="tutorial-steps">
          {data.steps.map((step) => (
            <div key={step.id} className="step-card">
              <span className="step-num">{step.id}단계</span>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
        <button className="feature-btn" onClick={() => navigate(-1)}>뒤로가기</button>
      </section>
    </div>
  );
}