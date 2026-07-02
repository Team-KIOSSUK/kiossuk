import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Bank.css';

// 1. 조회(inquiry) 추가
const typeLabel = {
  withdrawal: '출 금',
  deposit: '입 금',
  inquiry: '조 회', // 추가됨
};

export default function TransactionSelect() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const correctType = state?.type; 

  const handleSelect = (selectedType) => {
    // 조회 거래가 들어와도 문제없도록 로직 수정
    if (selectedType === correctType) {
      navigate('/kiosk/bank/practice', { state: { type: correctType } });
    } else {
      setMessage('다시 해보세요');
      setTimeout(() => setMessage(''), 1500);
    }
  };

  const handleCancel = () => {
    navigate('/kiosk/bank');
  };

  return (
    <div className="kiosk-page atm-container">
      <div className="select-screen">
        <div className="select-header">
          <span className="select-logo">MG</span>
          <span className="select-bank-name">키오쑥</span>
        </div>

        <p className="select-title">거래 선택</p>
        <p className="select-guide">원하시는 거래의 버튼을 눌러주세요</p>

        {message && <p className="select-warning">{message}</p>}

        {/* 2. 배열을 매핑하여 간결하게 구성 */}
        <div className="select-btn-group">
          {Object.entries(typeLabel).map(([key, label]) => (
            <button
              key={key}
              className={`select-btn ${key}`}
              onClick={() => handleSelect(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <button className="select-cancel-btn" onClick={handleCancel}>
        취소
      </button>
    </div>
  );
}