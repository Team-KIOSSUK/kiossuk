import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const fareMap = {
  KTX: 10000,
  ITX: 9000,
  무궁화호: 6000,
};

export default function TrainSelect() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { from, to, date, passengers, seatClass } = state || {};
  const [trainType, setTrainType] = useState('KTX');

  const classMultiplier = seatClass === '특실' ? 1.7 : 1;
  const farePerSeat = Math.round((fareMap[trainType] || 0) * classMultiplier);

  const handleConfirm = () => {
    navigate('/train-seat', { state: { from, to, date, passengers, seatClass, trainType } });
  };

  return (
    <div style={{ width: 412, minHeight: '100vh', margin: '0 auto', padding: 24, boxSizing: 'border-box', fontFamily: 'sans-serif' }}>
      <button onClick={() => navigate(-1)} style={{ border: 'none', background: '#fff', borderRadius: 999, width: 44, height: 44, fontSize: 22, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>&lt;</button>

      <h1 style={{ marginTop: 12, marginBottom: 8, fontSize: 24 }}>열차 선택</h1>
      <p style={{ color: '#666', marginTop: 0 }}>원하시는 열차 유형을 선택하세요.</p>

      <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 8px 24px rgba(0,0,0,0.06)', marginTop: 16 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          {['KTX', 'ITX', '무궁화호'].map((type) => (
            <button
              key={type}
              onClick={() => setTrainType(type)}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 12,
                border: trainType === type ? '2px solid #f06b8b' : '1px solid #eee',
                background: trainType === type ? '#fff2f5' : '#fff',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              {type}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 13, color: '#888' }}>예매 정보</div>
          <div style={{ color: '#555', marginTop: 6 }}>출발: {from || '—'}</div>
          <div style={{ color: '#555' }}>도착: {to || '—'}</div>
          <div style={{ color: '#555' }}>날짜: {date || '—'}</div>
          <div style={{ color: '#555' }}>인원: {passengers || '—'}명</div>
          <div style={{ color: '#555' }}>좌석: {seatClass || '—'}</div>
          <div style={{ color: '#555', marginTop: 8, fontWeight: 700 }}>좌석당 요금: {farePerSeat.toLocaleString()}원</div>
          {seatClass === '특실' && (
            <div style={{ fontSize: 12, color: '#f06b8b', marginTop: 4 }}>특실은 일반석 요금의 1.7배로 계산됩니다.</div>
          )}
        </div>

        <button onClick={handleConfirm} style={{ width: '100%', padding: 12, borderRadius: 12, border: 'none', background: '#f06b8b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>선택 완료</button>
      </div>
    </div>
  );
}
