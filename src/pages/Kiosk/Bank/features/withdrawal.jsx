import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Bank.css';

export default function Withdrawal() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const mode = location.state?.mode || 'practice';
  const [step, setStep] = useState(1);
  const [tempInput, setTempInput] = useState("");

  // 눈으로 보기 모드일 때 자동 진행
  useEffect(() => {
    if (mode === 'demo') {
      const timer = setInterval(() => {
        if (step < 7) setStep(prev => prev + 1);
        else {
          alert("시연이 완료되었습니다.");
          navigate('/kiosk/bank');
        }
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [mode, step, navigate]);

  const handleNext = () => {
    if (step < 7) {
      setTempInput("");
      setStep(step + 1);
    } else {
      handleFinalConfirm();
    }
  };

  const handleFinalConfirm = () => {
    alert("잘했어요! 홈으로 돌아갑니다.");
    navigate('/kiosk/bank');
  };

  return (
    <div className="bank-main-container">
      <div className="brand-header">키오쑥</div>
      
      <div className="kiosk-screen">
        {step === 1 && <button className="feature-btn" onClick={handleNext}>예금 인출</button>}
        {step === 2 && <button className="feature-btn" onClick={handleNext}>확인</button>}
        
        {step === 3 && (
          <div>
            <p>생년월일 6자리를 입력하세요.</p>
            <input type="password" value={tempInput} onChange={(e) => setTempInput(e.target.value)} />
            <button className="feature-btn" onClick={handleNext}>확인</button>
          </div>
        )}
        
        {step === 4 && (
          <div>
            <p>인증번호를 입력하세요.</p>
            <input type="password" value={tempInput} onChange={(e) => setTempInput(e.target.value)} />
            <button className="feature-btn" onClick={handleNext}>확인</button>
          </div>
        )}
        
        {step === 5 && <button className="feature-btn" onClick={handleNext}>출금 계좌 확인</button>}
        
        {step === 6 && (
          <div>
            <p>금액을 입력하세요.</p>
            <input type="password" value={tempInput} onChange={(e) => setTempInput(e.target.value)} />
            <button className="feature-btn" onClick={handleNext}>확인</button>
          </div>
        )}
        
        {step === 7 && <button className="feature-btn" onClick={handleFinalConfirm}>최종 확인</button>}
      </div>
    </div>
  );
}