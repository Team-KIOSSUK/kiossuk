import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { tutorialData } from './TutorialData';

export default function Practice() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const type = state?.type || 'withdrawal';
  const steps = tutorialData[type];
  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setTimeout(() => {
      navigate('/kiosk'); // 요청하신 /kiosk 경로로 자동 이동
    }, 2000);
    }
  };

  {currentStep.type !== "done" && (
  <button className="atm-btn" onClick={handleNext}>다음 단계</button>
)}

  return (
    <div className="atm-container">
      <div className="atm-screen">
        <p>{currentStep.text}</p>
        
        {/* 버튼 로직: 타입이 amount면 버튼 리스트, 아니면 그냥 '다음' 버튼 */}
        {currentStep.type === "amount" ? (
          currentStep.options.map(amt => (
            <button key={amt} className="atm-btn" onClick={handleNext}>{amt}</button>
          ))
        ) : (
          <button className="atm-btn" onClick={handleNext}>다음 단계</button>
        )}
      </div>

      {/* 핵심: 통장 인터랙션 */}
        {currentStep.type.includes("inquiry") && (
          <div 
            className={`passbook ${currentStep.type === 'inquiry_open' ? 'open' : 'closed'}`}
            onClick={handleNext}
          >
            {/* 여기에 통장 이미지 넣으세요 */}
            {currentStep.type === 'inquiry_closed' ? "닫힌 통장" : "열린 통장"}
          </div>
        )}

        {/* 일반 버튼 */}
        {currentStep.type === "done" && <button onClick={handleNext}>홈으로</button>}
      </div>
    
  );
}