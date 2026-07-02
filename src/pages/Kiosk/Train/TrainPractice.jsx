import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TrainPractice() {
  const navigate = useNavigate();
  const [from, setFrom] = useState('서울');
  const [to, setTo] = useState('부산');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [seatClass, setSeatClass] = useState('일반실');
  const [showSummary, setShowSummary] = useState(false);

  const handleConfirm = () => {
    if (!date) {
      alert('날짜를 선택해주세요.');
      return;
    }

    if (seatClass === '특실') {
      const confirmSpecial = window.confirm('특실은 일반석보다 1.7배 가격으로 계산됩니다. 이대로 진행하시겠습니까?');
      if (!confirmSpecial) {
        return;
      }
    }

    navigate('/train-select', { state: { from, to, date, passengers, seatClass } });
  };

  return (
    <div style={{ width: 412, minHeight: '100vh', margin: '0 auto', padding: 24, boxSizing: 'border-box', fontFamily: 'sans-serif' }}>
      <button onClick={() => navigate(-1)} style={{ border: 'none', background: '#fff', borderRadius: 999, width: 44, height: 44, fontSize: 22, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>&lt;</button>

      <h1 style={{ marginTop: 12, marginBottom: 8, fontSize: 24 }}>기차 예매 키오스크 연습</h1>
      <p style={{ color: '#666', marginTop: 0 }}>출발지, 도착지, 날짜를 선택하고 예매 흐름을 연습해보세요.</p>

      <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 8px 24px rgba(0,0,0,0.06)', marginTop: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: '#888' }}>출발</div>
          <select value={from} onChange={(e) => setFrom(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 6 }}>
            <option>서울</option>
            <option>대전</option>
            <option>대구</option>
            <option>부산</option>
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: '#888' }}>도착</div>
          <select value={to} onChange={(e) => setTo(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 6 }}>
            <option>부산</option>
            <option>대구</option>
            <option>대전</option>
            <option>서울</option>
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: '#888' }}>날짜</div>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 6 }} />
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 160 }}>
            <div style={{ fontSize: 13, color: '#888' }}>인원</div>
            <input type="number" min={1} max={6} value={passengers} onChange={(e) => setPassengers(Number(e.target.value))} style={{ width: '100%', padding: 8, marginTop: 6 }} />
          </div>
          <div style={{ flex: 1, minWidth: 160, marginLeft: 8 }}>
            <div style={{ fontSize: 13, color: '#888' }}>좌석 등급</div>
            <select value={seatClass} onChange={(e) => setSeatClass(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 6 }}>
              <option>일반실</option>
              <option>특실</option>
            </select>
          </div>
        </div>

        <button onClick={handleConfirm} style={{ width: '100%', padding: 12, borderRadius: 12, border: 'none', background: '#f06b8b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>예매 진행하기</button>
      </div>

      {showSummary && (
        <div style={{ marginTop: 18, background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>예매 요약</div>
          <div style={{ color: '#555' }}>출발: {from}</div>
          <div style={{ color: '#555' }}>도착: {to}</div>
          <div style={{ color: '#555' }}>날짜: {date || '선택 안됨'}</div>
          <div style={{ color: '#555' }}>인원: {passengers}명</div>
          <div style={{ color: '#555', marginBottom: 12 }}>좌석: {seatClass}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { setShowSummary(false); }} style={{ flex: 1, padding: 10, borderRadius: 10, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>수정</button>
            <button onClick={() => { alert('예매가 완료되었습니다 (모의)'); navigate('/kiosk'); }} style={{ flex: 1, padding: 10, borderRadius: 10, border: 'none', background: '#4caf50', color: '#fff', cursor: 'pointer' }}>결제 및 완료</button>
          </div>
        </div>
      )}
    </div>
  );
}
