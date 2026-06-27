import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Records.css';

export default function Records() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const savedRecords = localStorage.getItem('kiossukGameRecords');
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  }, []);

  const handleClearRecords = () => {
    if (window.confirm('정말로 모든 학습 기록을 삭제하시겠습니까?')) {
      localStorage.removeItem('kiossukGameRecords');
      setRecords([]);
    }
  };

  return (
    <div className="records-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        &lt;
      </button>
      <h1 className="page-title">학습 기록</h1>

      <div className="records-container">
        {records.length > 0 ? (
          <>
            <ul className="records-list">
              {records.map((record, index) => (
                <li key={index} className="record-item">
                  <span className="record-game">{record.game}</span>
                  <span className="record-date">{record.date}</span>
                </li>
              ))}
            </ul>
            <button onClick={handleClearRecords} className="clear-button">
              기록 전체 삭제
            </button>
          </>
        ) : (
          <div className="no-records">
            <p>아직 학습 기록이 없어요.</p>
            <p>두뇌 훈련 게임을 하고 기록을 확인해보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
}